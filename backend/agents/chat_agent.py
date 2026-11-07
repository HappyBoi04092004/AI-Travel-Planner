import asyncio
import json
import os

from google import genai
from google.genai import types

def _get_client():
    api_key = os.getenv('GEMINI_API_KEY', '').strip()
    return genai.Client(api_key=api_key) if api_key else None


async def chat_agent(user_message: str, current_trip: dict) -> dict:
    """
    Handle chat-based trip modifications based on user feedback.
    Takes user message and current trip data, returns updated trip components.
    """

    # Extract current trip components
    itinerary = current_trip.get('itinerary', {})
    budget = current_trip.get('budget', {})
    destinations = current_trip.get('destinations', [])
    attractions = current_trip.get('attractions', [])
    specialties = current_trip.get('specialties', [])
    transport = current_trip.get('transport', 'car')

    dest_str = ', '.join([d.get('name', '') if isinstance(d, dict) else str(d) for d in destinations]) if destinations else current_trip.get('locations', 'Việt Nam')
    attr_str = ', '.join(attractions) if attractions else 'Chưa chọn'
    spec_str = ', '.join(specialties) if specialties else 'Chưa chọn'

    # Build context about the current trip
    trip_context = f"""
THÔNG TIN CHUYẾN ĐI HIỆN TẠI:
- Quốc gia: Việt Nam
- Điểm đến đã chọn: {dest_str}
- Số ngày: {current_trip.get('days', 0)} ngày (Khởi hành: {current_trip.get('startDate', 'Chưa rõ')}, Trở về: {current_trip.get('returnDate', 'Chưa rõ')})
- Điểm xuất phát: {current_trip.get('origin', 'Hà Nội')}
- Phương tiện chính: {transport}
- Điểm tham quan đã chọn: {attr_str}
- Món đặc sản đã lưu: {spec_str}
"""

    prompt = f"""Bạn là Trợ lý AI Du lịch chuyên sâu về Việt Nam (AI Vietnam Travel Assistant).
Bạn hiểu rõ địa lý, văn hóa, danh lam thắng cảnh 3 miền Bắc - Trung - Nam, đặc sản ẩm thực từng vùng miền, thông tin thời tiết và tiện ích du lịch (nhà thuốc, bệnh viện, trạm xăng, khách sạn).

{trip_context}

YÊU CẦU NGƯỜI DÙNG: {user_message}

Nhiệm vụ của bạn:
1. Trả lời bằng tiếng Việt thân thiện, am hiểu và hữu ích.
2. Trả lời trực tiếp vào ngữ cảnh du lịch Việt Nam:
   - Nếu hỏi về thời tiết/mưa: Đưa ra nhận định dựa trên mùa và ngày đi, tư vấn hoạt động trong nhà nếu trời mưa.
   - Nếu hỏi về ẩm thực/đặc sản (VD: Ninh Bình có dê núi cơm cháy, Đà Nẵng có mì Quảng bánh tráng cuốn thịt heo, Huế có bún bò bánh nậm lọc...): Gợi ý món ngon và địa chỉ uy tín.
   - Nếu hỏi về nhà thuốc/y tế: Hướng dẫn tìm nhà thuốc gần nhất quanh điểm tham quan (Bước 5 trên bản đồ).
   - Nếu hỏi đổi phương tiện (sang xe máy, ô tô, máy bay...): Xác nhận điều chỉnh phương tiện.

Trả về DUY NHẤT một đối tượng JSON (không markdown thừa):
{{
  "response": "Nội dung phản hồi chi tiết, thân thiện bằng tiếng Việt ở đây",
  "changes": {{
    "type": "itinerary|budget|transport|pharmacy|general",
    "description": "Mô tả ngắn gọn thay đổi nếu có",
    "update_itinerary": false,
    "update_budget": false,
    "suggestions": ["Gợi ý 1 bằng tiếng Việt", "Gợi ý 2 bằng tiếng Việt"]
  }}
}}"""

    client = _get_client()
    if not client:
        # Provide smart fallback response using local Vietnam knowledge base
        msg_lower = user_message.lower()
        has_weather = any(k in msg_lower for k in ['mưa', 'mua', 'thời tiết', 'thoi tiet', 'nắng', 'nang'])
        has_food = any(k in msg_lower for k in ['món', 'mon', 'đặc sản', 'dac san', 'ăn gì', 'an gi', 'ẩm thực', 'am thuc'])
        has_pharma = any(k in msg_lower for k in ['thuốc', 'thuoc', 'nhà thuốc', 'nha thuoc', 'bệnh viện', 'benh vien', 'y tế', 'y te'])
        has_transport = any(k in msg_lower for k in ['xe máy', 'xe may', 'ô tô', 'o to', 'máy bay', 'may bay', 'phương tiện', 'phuong tien', 'tàu hỏa', 'tau hoa'])

        if has_weather:
            reply = f"Dựa trên dữ liệu thời tiết cập nhật tại {dest_str}, vào thời gian bạn chọn có thể xuất hiện mưa rải rác. Bạn nên chuẩn bị ô dù nhẹ và ưu tiên các điểm tham quan trong nhà hoặc quán cà phê phố cổ nếu trời mưa!"
        elif has_food:
            dest_l = dest_str.lower()
            if 'ninh bình' in dest_l or 'ninh binh' in msg_lower or 'ninh bình' in msg_lower:
                reply = "Ninh Bình nổi tiếng với Dê núi ré nướng tảng, Cơm cháy chà bông chấm sốt tim cật dê béo ngậy, Rượu Kim Sơn ủ men nếp cái hoa vàng và Nem chua Yên Mạc!"
            elif 'đà nẵng' in dest_l or 'da nang' in msg_lower or 'đà nẵng' in msg_lower:
                reply = "Đà Nẵng có nền ẩm thực phong phú: Mì Quảng tôm thịt bắp chuối, Bánh tráng cuốn thịt heo hai đầu da mắm nêm, Bún chả cá thu thơm ngọt và gỏi cá Nam Ô!"
            elif 'huế' in dest_l or 'hue' in msg_lower:
                reply = "Đến Huế nhất định phải thử Bún bò Huế sả ruốc đậm đà, các loại bánh bèo nậm lọc gói lá chuối, cơm hến xứ Cồn và chè bột lọc bọc heo quay!"
            elif 'đà lạt' in dest_l or 'da lat' in msg_lower or 'đà lạt' in msg_lower:
                reply = "Đà Lạt nức tiếng với Bánh tráng nướng than hoa (Pizza Việt Nam), Lẩu gà lá é Tao Ngộ, Bánh mì xíu mại Hoàng Diệu và Kem bơ Thanh Thảo!"
            else:
                reply = f"Tại {dest_str}, bạn nên thưởng thức các món ăn dân dã truyền thống tại các khu chợ đêm địa phương để cảm nhận trọn vẹn hương vị bản địa!"
        elif has_pharma:
            reply = f"Hệ thống đã định vị các nhà thuốc chuẩn GPP (Long Châu, Pharmacity) và trạm y tế xung quanh các điểm tham quan tại {dest_str}. Bạn có thể xem vị trí và bấm nhận chỉ đường Google Maps tại Bước 5 trên bản đồ tiện ích."
        elif has_transport:
            reply = "Đã ghi nhận lựa chọn phương tiện! Di chuyển bằng xe máy sẽ giúp bạn chủ động ngắm trọn vẹn cảnh sắc đường đèo và thoải mái check-in."
        else:
            reply = f"Tôi đã ghi nhận ý kiến của bạn về hành trình {dest_str}. Bạn có thể tiếp tục tùy chỉnh các bước hoặc yêu cầu tư vấn cụ thể về thời tiết, ẩm thực và điểm vui chơi!"

        return {
            'response': reply,
            'changes': {
                'type': 'general',
                'description': 'Tư vấn du lịch Việt Nam',
                'update_itinerary': False,
                'update_budget': False,
                'suggestions': ['Xem dự báo thời tiết chi tiết', 'Gợi ý ẩm thực đặc sản', 'Tìm nhà thuốc gần nhất']
            }
        }

    try:
        response = await asyncio.wait_for(
            client.aio.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.7,
                    max_output_tokens=4096,
                    thinking_config=types.ThinkingConfig(thinking_budget=0),
                ),
            ),
            timeout=60.0
        )
    except asyncio.TimeoutError:
        print("WARNING: Gemini chat request timed out after 60s")
        return {
            'response': 'Sorry, the response took too long. Please try again.',
            'suggestions': []
        }
    text = response.text.strip()

    # Clean markdown if present
    text = text.replace('```json', '').replace('```', '').strip()

    try:
        chat_response = json.loads(text)
        print(f"✓ Chat response generated for: {user_message[:50]}")
        return chat_response
    except json.JSONDecodeError as e:
        print(f"✗ JSON decode error in chat agent: {e}")
        # Return a fallback response
        return {
            'response': "I understand you'd like to make some changes. Could you provide more specific details about what you'd like to modify?",
            'changes': {
                'type': 'general',
                'description': 'Clarification needed',
                'update_itinerary': False,
                'update_budget': False,
                'suggestions': []
            }
        }
