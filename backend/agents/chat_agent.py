import asyncio
import json
import os
import re

from google import genai
from google.genai import types

from agents.model_manager import get_gemini_client, get_configured_models

def _get_client():
    return get_gemini_client()


# Local Vietnam Knowledge Base for Smart Fallback
VIETNAM_DEST_DATA = {
    'ninhbinh': {
        'name': 'Ninh Bình',
        'spots': ['Cố đô Hoa Lư', 'Tràng An', 'Tam Cốc - Bích Động', 'Hang Múa', 'Chùa Bái Đính'],
        'foods': ['Dê núi ré nướng tảng', 'Cơm cháy sốt dê béo ngậy', 'Nem chua Yên Mạc', 'Rượu Kim Sơn'],
        'activities': ['Đi thuyền nan luồn hang Tràng An', 'Leo 500 bậc ngắm toàn cảnh Hang Múa', 'Ăn dê núi ré bản địa', 'Đi chùa Bái Đính cầu an', 'Viếng đền vua Đinh, vua Lê tại Hoa Lư'],
        'weather_tips': 'Ninh Bình đẹp nhất vào mùa lúa chín tháng 5-6 hoặc mùa xuân tháng 1-3. Nếu gặp mưa, bạn có thể tham quan các hang động đá vôi tự nhiên hoặc quần thể chùa Bái Đính có mái che.'
    },
    'hanoi': {
        'name': 'TP. Hà Nội',
        'spots': ['Hồ Gươm & 36 Phố Phường', 'Quần thể Ba Đình', 'Văn Miếu - Quốc Tử Giám', 'Hồ Tây'],
        'foods': ['Phở bò Bát Đàn', 'Bún chả Hàng Mành', 'Chả cá Lã Vọng', 'Cà phê trứng Giảng', 'Bánh cuốn Thanh Trì'],
        'activities': ['Dạo quanh Hồ Gươm ngắm Tháp Rùa', 'Thưởng thức cà phê trứng phố cổ', 'Thăm Văn Miếu Quốc Tử Giám', 'Uống bia hơi phố Tạ Hiện về đêm'],
        'weather_tips': 'Mùa thu Hà Nội (tháng 9-11) là thời điểm lãng mạn nhất. Mùa hè có mưa rào chiều tối, mùa đông se lạnh thích hợp ăn phở nóng và dạo phố.'
    },
    'danang': {
        'name': 'TP. Đà Nẵng',
        'spots': ['Bà Nà Hills & Cầu Vàng', 'Bán đảo Sơn Trà', 'Biển Mỹ Khê', 'Cầu Rồng & Ngũ Hành Sơn'],
        'foods': ['Mì Quảng tôm thịt bắp chuối', 'Bánh tráng cuốn thịt heo hai đầu da', 'Bún chả cá thu', 'Gỏi cá Nam Ô', 'Bánh xèo nem lụi'],
        'activities': ['Check-in Cầu Vàng Bà Nà Hills', 'Ngắm Cầu Rồng phun lửa lúc 21h cuối tuần', 'Tắm biển Mỹ Khê', 'Lái xe máy quanh đèo Hải Vân kỳ vĩ'],
        'weather_tips': 'Mùa khô từ tháng 1 đến tháng 8 là lý tưởng nhất để tắm biển. Tháng 9-11 thường có mưa bão ven biển miền Trung.'
    },
    'hue': {
        'name': 'TP. Huế',
        'spots': ['Đại Nội Hoàng Thành Huế', 'Chùa Thiên Mụ', 'Lăng Tự Đức & Lăng Khải Định', 'Sông Hương'],
        'foods': ['Bún bò Huế sả ruốc đậm đà', 'Bánh bèo - nậm - lọc gói lá chuối', 'Cơm hến cồn Hến', 'Chè bột lọc bọc heo quay', 'Nem lụi chợ Đông Ba'],
        'activities': ['Nghe ca Huế trên thuyền rồng sông Hương', 'Mặc áo Nhật Bình chụp ảnh tại Đại Nội', 'Thăm các lăng tẩm triều Nguyễn', 'Thưởng thức ẩm thực cung đình'],
        'weather_tips': 'Huế nổi tiếng với những cơn mưa dầm vào mùa thu đông (tháng 9-12). Nếu trời mưa, bạn hãy ngồi quán ngắm mưa bên dòng Hương Giang hoặc thăm các bảo tàng trong Đại Nội.'
    },
    'quangnam': {
        'name': 'Quảng Nam (Hội An)',
        'spots': ['Phố cổ Hội An', 'Rừng dừa Bảy Mẫu', 'Thánh địa Mỹ Sơn', 'Cù Lao Chàm'],
        'foods': ['Cao lầu Hội An', 'Mì Quảng', 'Cơm gà bà Buội', 'Bánh mì Phượng', 'Nước mót thảo mộc'],
        'activities': ['Thả hoa đăng trên sông Hoài về đêm', 'Đi thuyền thúng xoay ở rừng dừa Bảy Mẫu', 'Khám phá đền tháp Chăm pa Mỹ Sơn', 'Đi bộ dưới ánh đèn lồng phố cổ'],
        'weather_tips': 'Mùa khô từ tháng 2 đến tháng 7 là đẹp nhất. Tránh mùa lũ lụt sông Hoài vào tháng 10-11.'
    },
    'laocai': {
        'name': 'Lào Cai (Sa Pa)',
        'spots': ['Đỉnh Fansipan nóc nhà Đông Dương', 'Bản Cát Cát', 'Đèo Ô Quy Hồ', 'Thung lũng Mường Hoa'],
        'foods': ['Thắng cố ngựa Mường Khương', 'Lợn cắp nách nướng than hoa', 'Lẩu cá hồi Sa Pa', 'Thịt trâu gác bếp'],
        'activities': ['Chinh phục đỉnh Fansipan 3.143m', 'Check-in ruộng bậc thang Mường Hoa', 'Săn mây hoàng hôn tại đèo Ô Quy Hồ', 'Tắm lá thuốc người Dao đỏ'],
        'weather_tips': 'Sa Pa thời tiết sương mù quanh năm, mùa đông có thể có băng tuyết (dưới 5°C). Cần mang áo ấm dày, giày chống trượt.'
    },
    'hagiang': {
        'name': 'Hà Giang',
        'spots': ['Đèo Mã Pí Lèng', 'Hẻm vực Tu Sản - Sông Nho Quế', 'Cao nguyên đá Đồng Văn', 'Cột cờ Lũng Cú'],
        'foods': ['Cháo ấu tẩu', 'Bánh tam giác mạch', 'Thắng dền', 'Phở tráng kìm', 'Lạp xưởng gác bếp'],
        'activities': ['Đi thuyền kayak dưới hẻm Tu Sản sông Nho Quế', 'Phượt đèo Mã Pí Lèng một trong tứ đại đỉnh đèo', 'Check-in điểm cực Bắc Cột cờ Lũng Cú'],
        'weather_tips': 'Hà Giang mùa hoa tam giác mạch đẹp nhất tháng 10-12, mùa nước đổ tháng 5-6. Cung đường đèo dốc hiểm trở, ưu tiên đi xe máy số hoặc thuê xe ô tô có tài xế bản địa.'
    },
    'lamdong': {
        'name': 'Lâm Đồng (Đà Lạt)',
        'spots': ['Hồ Xuân Hương', 'Quảng trường Lâm Viên', 'Langbiang', 'Thác Datanla', 'Chợ đêm Đà Lạt'],
        'foods': ['Bánh tráng nướng Đà Lạt', 'Lẩu gà lá é Tao Ngộ', 'Bánh mì xíu mại chén', 'Kem bơ Thanh Thảo', 'Dâu tây tươi'],
        'activities': ['Chèo SUP hồ Tuyền Lâm buổi sáng', 'Ngắm mây đồi chè Cầu Đất', 'Đi xe trượt thác Datanla', 'Uống sữa đậu nành nóng chợ đêm'],
        'weather_tips': 'Đà Lạt có 4 mùa trong 1 ngày, sáng sớm se lạnh, trưa nắng ấm, chiều tối lạnh buốt. Luôn mang theo áo khoác len mỏng và ô che mưa nhỏ.'
    },
    'kiengiang': {
        'name': 'Kiên Giang (Phú Quốc)',
        'spots': ['Thị trấn Hoàng Hôn Sunset Town', 'Bãi Sao & Bãi Khem', 'Quần đảo An Thới', 'Grand World'],
        'foods': ['Bún quậy Kiến Xây', 'Gỏi cá trích Phú Quốc', 'Nước mắm truyền thống', 'Ghẹ Hàm Ninh'],
        'activities': ['Lặn ngắm san hô tại hòn Móng Tay, hòn Gầm Ghì', 'Đi cáp treo Hòn Thơm vượt biển dài nhất thế giới', 'Ngắm hoàng hôn Bãi Dài'],
        'weather_tips': 'Mùa đẹp nhất từ tháng 11 đến tháng 4 năm sau (biển êm, sóng lặng, nước xanh ngọc). Mùa mưa bão từ tháng 7 đến tháng 9.'
    },
    'tphcm': {
        'name': 'TP. Hồ Chí Minh',
        'spots': ['Nhà thờ Đức Bà & Bưu điện TT', 'Chợ Bến Thành', 'Phố đi bộ Nguyễn Huệ & Bùi Viện', 'Dinh Độc Lập'],
        'foods': ['Cơm tấm sườn bì chả', 'Hủ tiếu Nam Vang', 'Bánh mì Sài Gòn', 'Ốc chảo quận 4', 'Cà phê sữa đá bệt'],
        'activities': ['Đi xe buýt sông Saigon Waterbus ngắm Landmark 81', 'Dạo phố đi bộ Nguyễn Huệ về đêm', 'Thưởng thức ẩm thực đường phố hẻm Sài Gòn'],
        'weather_tips': 'Sài Gòn có 2 mùa mưa - khô. Mùa mưa (tháng 5-11) thường mưa rào bất chợt rồi tạnh ngay trong 30-45 phút.'
    }
}


def _generate_smart_local_response(user_message: str, current_trip: dict) -> dict:
    """Intelligent rule & NLP-assisted local Vietnam response generator when Gemini API is offline or keyless."""
    msg_l = user_message.lower().strip()
    destinations = current_trip.get('destinations', [])
    dest_names = [d.get('name', '') if isinstance(d, dict) else str(d) for d in destinations]
    primary_dest = dest_names[0] if dest_names else 'Việt Nam'

    actions = []
    suggestions = []
    reply = ""

    # Match relevant province if mentioned
    matched_key = None
    for k, v in VIETNAM_DEST_DATA.items():
        if k in msg_l or v['name'].lower() in msg_l or any(spot.lower() in msg_l for spot in v['spots']):
            matched_key = k
            break

    # If no destination mentioned directly in message, use current selected destination
    if not matched_key and dest_names:
        for k, v in VIETNAM_DEST_DATA.items():
            if v['name'].lower() in primary_dest.lower() or k in primary_dest.lower():
                matched_key = k
                break

    data = VIETNAM_DEST_DATA.get(matched_key or 'ninhbinh')

    # 1. WEATHER & CLIMATE
    if any(k in msg_l for k in ['thời tiết', 'thoi tiet', 'mưa', 'mua', 'nắng', 'nang', 'lạnh', 'nhiệt độ', 'khi hau']):
        dest_display = data['name'] if matched_key else primary_dest
        reply = (
            f"🌦️ **Dự báo thời tiết & Tư vấn cho {dest_display}:**\n\n"
            f"{data['weather_tips']}\n\n"
            f"💡 **Mẹo khi gặp mưa:**\n"
            f"- Hãy ưu tiên các điểm tham quan có mái che, bảo tàng, hoặc thưởng thức trà, cà phê ngắm cảnh.\n"
            f"- Bản đồ của chúng tôi có tích hợp cảnh báo thời tiết tự động theo thời gian thực tại Bước 2."
        )
        actions.append({
            'type': 'go_to_step',
            'data': 2,
            'label': '🗺️ Xem chi tiết Thời tiết trên Bản đồ'
        })
        suggestions = [
            f"Ăn gì ngon ở {dest_display}?",
            f"Tụ điểm vui chơi hàng đầu tại {dest_display}",
            "Đổi phương tiện sang Xe máy"
        ]

    # 2. FOOD & SPECIALTIES
    elif any(k in msg_l for k in ['món', 'mon', 'đặc sản', 'dac san', 'ăn gì', 'an gi', 'ẩm thực', 'am thuc', 'quán ngon']):
        dest_display = data['name'] if matched_key else primary_dest
        foods_text = "\n".join([f"- **{f}**: Đặc sản trứ danh mang phong vị đậm đà vùng đất {dest_display}." for f in data['foods']])
        reply = (
            f"🍲 **Tinh hoa ẩm thực đặc sắc tại {dest_display}:**\n\n"
            f"{foods_text}\n\n"
            f"✨ Tôi đã có sẵn danh sách các quán ngon đạt chuẩn vệ sinh an toàn thực phẩm. Bạn có thể lưu các món này vào lịch trình tại Bước 3!"
        )
        actions.append({
            'type': 'go_to_step',
            'data': 3,
            'label': '🍲 Mở Thực đơn Ẩm thực (Bước 3)'
        })
        if matched_key and matched_key not in [d.get('id', '') for d in destinations if isinstance(d, dict)]:
            actions.append({
                'type': 'add_destination',
                'data': matched_key,
                'label': f"+ Thêm {data['name']} vào chuyến đi"
            })
        suggestions = [
            f"Các điểm vui chơi tại {dest_display}",
            "Tìm nhà thuốc gần quán ăn",
            "Tối ưu lại lịch trình ngày"
        ]

    # 3. TOURIST SPOTS, ACTIVITIES, CLUSTERS
    elif any(k in msg_l for k in ['chơi gì', 'choi gi', 'tham quan', 'điểm đến', 'diem den', 'vui chơi', 'dia diem', 'checkin', 'check in', 'chùa', 'đền', 'leo núi', 'thuyền']):
        dest_display = data['name'] if matched_key else primary_dest
        spots_text = "\n".join([f"- 📍 **{s}**" for s in data['spots']])
        acts_text = "\n".join([f"- ✓ {a}" for a in data['activities']])
        reply = (
            f"🏛️ **Các tụ điểm ăn chơi & danh lam thắng cảnh tại {dest_display}:**\n\n"
            f"**Điểm check-in nổi tiếng:**\n{spots_text}\n\n"
            f"**Hoạt động trải nghiệm không thể bỏ lỡ:**\n{acts_text}\n\n"
            f"💡 Khi bạn chọn tỉnh này trên bản đồ 3D (Bước 2), toàn bộ các tụ điểm con sẽ được phóng to chi tiết!"
        )
        actions.append({
            'type': 'go_to_step',
            'data': 2,
            'label': f'🗺️ Phóng to {dest_display} trên Bản đồ 3D'
        })
        if matched_key and not any(d.get('id', '') == matched_key for d in destinations if isinstance(d, dict)):
            actions.append({
                'type': 'add_destination',
                'data': matched_key,
                'label': f"+ Thêm {data['name']} vào hành trình"
            })
        suggestions = [
            f"Đặc sản {dest_display} có gì?",
            "Thời tiết những hôm tới thế nào?",
            "Khoảng cách di chuyển bao nhiêu km?"
        ]

    # 4. PHARMACY, MEDICAL, EMERGENCY
    elif any(k in msg_l for k in ['thuốc', 'thuoc', 'nhà thuốc', 'nha thuoc', 'bệnh viện', 'benh vien', 'y tế', 'y te', 'cấp cứu', 'khẩn cấp']):
        dest_display = data['name'] if matched_key else primary_dest
        reply = (
            f"💊 **Hỗ trợ y tế & Nhà thuốc khẩn cấp quanh {dest_display}:**\n\n"
            f"- Hệ thống đã tự động định vị các hiệu thuốc đạt chuẩn GPP (Pharmacity, FPT Long Châu, nhà thuốc trung tâm) và trạm y tế gần các điểm du lịch.\n"
            f"- Có sẵn số điện thoại liên hệ, giờ mở cửa và nút **Chỉ đường Google Maps** trực tiếp.\n\n"
            f"👉 Nhấn nút bên dưới để mở ngay Bản đồ tiện ích y tế (Bước 5):"
        )
        actions.append({
            'type': 'search_pharmacy',
            'data': 'pharmacy',
            'label': '💊 Mở Bản đồ Nhà thuốc gần nhất (Bước 5)'
        })
        actions.append({
            'type': 'search_pharmacy',
            'data': 'hospital',
            'label': '🏥 Xem Bệnh viện & Trạm cấp cứu'
        })
        suggestions = [
            "Quán ăn ngon gần bệnh viện",
            "Dự báo thời tiết hôm nay",
            "Quay lại Bước 2 bản đồ"
        ]

    # 5. TRANSPORTATION
    elif any(k in msg_l for k in ['xe máy', 'xe may', 'ô tô', 'o to', 'máy bay', 'may bay', 'tàu hỏa', 'tau hoa', 'xe khách', 'xe khach', 'phương tiện', 'phuong tien', 'di chuyển']):
        if 'xe máy' in msg_l or 'xe may' in msg_l:
            mode = 'motorbike'
            name_mode = 'Xe máy (Phượt tự do)'
        elif 'máy bay' in msg_l or 'may bay' in msg_l:
            mode = 'plane'
            name_mode = 'Máy bay (Nhanh nhất)'
        elif 'tàu' in msg_l or 'tau' in msg_l:
            mode = 'train'
            name_mode = 'Tàu hỏa Bắc - Nam'
        elif 'xe khách' in msg_l or 'giường nằm' in msg_l:
            mode = 'sleeper_bus'
            name_mode = 'Xe khách giường nằm'
        else:
            mode = 'car'
            name_mode = 'Ô tô riêng / Taxi'

        reply = (
            f"🚗 **Điều chỉnh phương tiện di chuyển:**\n\n"
            f"Tôi đã sẵn sàng cập nhật phương tiện ưu tiên sang **{name_mode}** cho bạn.\n"
            f"- Hệ thống sẽ tự động tính lại chi phí xăng xe/vé tàu xe, thời gian di chuyển và khoảng cách tương ứng trên từng chặng.\n\n"
            f"👉 Nhấn nút xác nhận bên dưới để áp dụng ngay vào chuyến đi:"
        )
        actions.append({
            'type': 'change_transport',
            'data': mode,
            'label': f'✓ Xác nhận đổi sang {name_mode}'
        })
        actions.append({
            'type': 'go_to_step',
            'data': 4,
            'label': '🚚 Xem chi tiết 6 phương tiện (Bước 4)'
        })
        suggestions = [
            "Khoảng cách giữa các điểm là bao nhiêu?",
            "Thời tiết dọc đường đi thế nào?",
            "Tối ưu kinh phí đi lại"
        ]

    # 6. TRIP PACING & SCHEDULE DURATION
    elif any(k in msg_l for k in ['nhịp độ', 'nhip do', 'thư thả', 'thu tha', 'nhanh', 'khám phá nhiều', 'cân bằng', 'can bang', 'mấy ngày', 'may ngay']):
        reply = (
            "⏱️ **Tối ưu hóa nhịp độ hành trình:**\n\n"
            "- **Thư thả (Relaxed):** 1-2 điểm tham quan/ngày, có nhiều thời gian nghỉ ngơi, cà phê và trải nghiệm ẩm thực bản địa.\n"
            "- **Cân bằng (Balanced - Khuyên dùng):** 3-4 điểm/ngày, kết hợp danh lam thắng cảnh và chợ đêm.\n"
            "- **Khám phá tối đa (Fast):** Dành cho tín đồ xê dịch muốn check-in thật nhiều điểm đến nổi tiếng."
        )
        actions.append({'type': 'change_pace', 'data': 'relaxed', 'label': '☕ Đổi nhịp độ sang Thư thả'})
        actions.append({'type': 'change_pace', 'data': 'balanced', 'label': '⚖️ Đổi nhịp độ sang Cân bằng'})
        actions.append({'type': 'change_pace', 'data': 'fast', 'label': '⚡ Đổi sang Khám phá nhiều'})
        suggestions = [
            "Gợi ý lịch trình 5 ngày 4 đêm",
            "Xem tổng kết chi phí",
            "Mở bản đồ du lịch"
        ]

    # 7. ADD SPECIFIC DESTINATION
    elif any(k in msg_l for k in ['thêm', 'them', 'ghé', 'ghe', 'đi thêm', 'di them', 'chọn tỉnh', 'chon tinh']):
        if matched_key and data:
            reply = (
                f"📍 Bạn muốn ghé thăm **{data['name']}**?\n\n"
                f"- Vùng đất này có {len(data['spots'])} cụm tụ điểm du lịch nổi tiếng: {', '.join(data['spots'][:3])}...\n"
                f"- Đặc sản tiêu biểu: {', '.join(data['foods'][:3])}.\n\n"
                f"👉 Bấm nút bên dưới để thêm trực tiếp {data['name']} vào chuyến đi:"
            )
            actions.append({
                'type': 'add_destination',
                'data': matched_key,
                'label': f"+ Thêm {data['name']} vào chuyến đi"
            })
            actions.append({
                'type': 'go_to_step',
                'data': 2,
                'label': '🗺️ Xem trên Bản đồ Địa hình 3D'
            })
        else:
            reply = "📍 Bạn muốn thêm điểm đến nào vào chuyến đi? Việt Nam sau sáp nhập gồm 34 tỉnh thành với 77 cụm tụ điểm du lịch (Ninh Bình, Sa Pa, Hà Giang, Đà Nẵng, Huế, Phú Quốc...). Bạn có thể gõ tên tỉnh để tôi thêm ngay!"
        suggestions = [
            "Thêm Ninh Bình vào chuyến đi",
            "Thêm Sa Pa vào chuyến đi",
            "Thêm Đà Nẵng vào chuyến đi"
        ]

    # 8. GENERAL GREETING OR INQUIRY
    else:
        dest_display = data['name'] if matched_key else primary_dest
        reply = (
            f"👋 Chào bạn! Tôi là **Trợ lý AI Du lịch Việt Nam**, luôn túc trực hỗ trợ bạn trên từng bước hành trình:\n\n"
            f"- 🗺️ **Bản đồ 34 Tỉnh thành & 77 tụ điểm** (Hoa Lư, Sa Pa, Pác Bó, Bà Nà...)\n"
            f"- 🌦️ **Dự báo thời tiết thực tế** & phương án dự phòng khi trời mưa\n"
            f"- 🍲 **Đặc sản ẩm thực bản địa** & danh sách quán ngon\n"
            f"- 🚗 **Tính toán thời gian & đổi phương tiện di chuyển** (Xe máy, Ô tô, Tàu hỏa...)\n"
            f"- 💊 **Bản đồ nhà thuốc GPP & trạm y tế gần nhất**\n\n"
            f"Bạn có thể bấm vào các gợi ý bên dưới hoặc gõ bất kỳ câu hỏi nào!"
        )
        actions.append({
            'type': 'go_to_step',
            'data': 2,
            'label': '🗺️ Mở Bản đồ 34 Tỉnh thành'
        })
        suggestions = [
            f"Thời tiết {dest_display} có mưa không?",
            f"Món ăn đặc sản tại {dest_display}",
            "Đổi phương tiện sang Xe máy"
        ]

    return {
        'response': reply,
        'actions': actions,
        'suggestions': suggestions[:3],
        'changes': {
            'type': 'general',
            'description': 'AI Vietnam Travel Assistant Response',
            'update_itinerary': False,
            'update_budget': False,
            'suggestions': suggestions[:3]
        }
    }


async def chat_agent(user_message: str, current_trip: dict) -> dict:
    """
    Handle chat-based trip modifications based on user feedback.
    Connects to Google Gemini API (gemini-2.5-flash / gemini-2.0-flash / gemini-1.5-flash) when API Key is provided,
    and falls back seamlessly to the comprehensive local Vietnam AI engine when keyless or offline.
    """
    client = _get_client()

    # If no Gemini API key is configured in backend/.env, use our intelligent local Vietnam AI engine
    if not client:
        return _generate_smart_local_response(user_message, current_trip)

    # Extract current trip components
    destinations = current_trip.get('destinations', [])
    attractions = current_trip.get('attractions', [])
    specialties = current_trip.get('specialties', [])
    transport = current_trip.get('transport', 'car')

    dest_str = ', '.join([d.get('name', '') if isinstance(d, dict) else str(d) for d in destinations]) if destinations else current_trip.get('locations', 'Việt Nam')
    attr_str = ', '.join(attractions) if attractions else 'Chưa chọn'
    spec_str = ', '.join(specialties) if specialties else 'Chưa chọn'

    trip_context = f"""
THÔNG TIN CHUYẾN ĐI HIỆN TẠI CỦA NGƯỜI DÙNG:
- Quốc gia: Việt Nam
- Các tỉnh thành đã chọn: {dest_str}
- Số ngày: {current_trip.get('days', 0)} ngày (Khởi hành: {current_trip.get('startDate', 'Chưa rõ')}, Trở về: {current_trip.get('returnDate', 'Chưa rõ')})
- Điểm xuất phát: {current_trip.get('origin', 'Hà Nội')}
- Nhịp độ chuyến đi: {current_trip.get('pace', 'balanced')}
- Phương tiện chính: {transport}
- Điểm tham quan đã chọn: {attr_str}
- Món ăn đặc sản đã lưu: {spec_str}
"""

    prompt = f"""Bạn là Trợ lý AI Du lịch Việt Nam (AI Vietnam Travel Assistant) xuất sắc nhất.
Bạn am hiểu tường tận 34 tỉnh thành sau sắp xếp của Việt Nam (Nghị quyết 202/2025/QH15), 77 cụm tụ điểm du lịch nổi tiếng (như Cố đô Hoa Lư, Tràng An, Sa Pa, Pác Bó, Bà Nà Hills, Hội An...), ẩm thực đặc sản từng địa phương, phương tiện di chuyển và thời tiết các mùa.

{trip_context}

CÂU HỎI / YÊU CẦU CỦA NGƯỜI DÙNG:
"{user_message}"

HƯỚNG DẪN TRẢ LỜI:
1. Trả lời bằng tiếng Việt tự nhiên, am hiểu sâu sắc, văn phong thân thiện, truyền cảm hứng du lịch.
2. Trả lời trực tiếp vào trọng tâm:
   - Nếu hỏi về thời tiết/mưa: Đưa ra nhận định khí hậu theo mùa, gợi ý phương án thay thế trong nhà (bảo tàng, chùa chiền, cà phê) nếu trời mưa.
   - Nếu hỏi về ẩm thực: Gợi ý các món ngon đặc trưng và cách thưởng thức chuẩn vị (VD: Ninh Bình có dê núi ré, cơm cháy; Đà Nẵng có mì Quảng, bánh tráng cuốn thịt heo; Sa Pa có thắng cố, lợn cắp nách...).
   - Nếu hỏi về nhà thuốc/y tế/sức khỏe: Hướng dẫn tìm nhà thuốc chuẩn GPP quanh các điểm tham quan.
   - Nếu muốn đổi phương tiện/đổi nhịp độ/thêm điểm đến: Tạo action tương ứng.
3. Kèm theo danh sách các `actions` tương tác nếu phù hợp (mỗi action là một nút bấm thực thi trong ứng dụng). Các loại action hợp lệ:
   - "add_destination": thêm tỉnh (data: "ninhbinh", "danang", "laocai", "hagiang", "lamdong", "hue", "tphcm", "quangnam", "kiengiang", v.v.)
   - "change_transport": đổi phương tiện (data: "motorbike" | "car" | "plane" | "train" | "sleeper_bus")
   - "change_pace": đổi nhịp độ (data: "relaxed" | "balanced" | "fast")
   - "search_pharmacy": tìm tiện ích/nhà thuốc (data: "pharmacy" | "hospital")
   - "go_to_step": nhảy đến bước (data: 1 | 2 | 3 | 4 | 5 | 6)

ĐỊNH DẠNG TRẢ VỀ:
Trả về DUY NHẤT một chuỗi JSON hợp lệ (không chứa markdown backticks ```json ... ``` thừa ở ngoài):
{{
  "response": "Nội dung trả lời chi tiết bằng tiếng Việt, định dạng markdown đẹp mắt (in đậm, gạch đầu dòng, emoji)",
  "actions": [
    {{
      "type": "add_destination|change_transport|change_pace|search_pharmacy|go_to_step",
      "data": "ninhbinh",
      "label": "+ Thêm Ninh Bình vào chuyến đi"
    }}
  ],
  "suggestions": [
    "Câu hỏi gợi ý 1 ngắn gọn",
    "Câu hỏi gợi ý 2 ngắn gọn",
    "Câu hỏi gợi ý 3 ngắn gọn"
  ]
}}"""

    # Dynamic Multi-Model Fallback & Rotation sequence
    models_to_try = get_configured_models()

    for model_name in models_to_try:
        try:
            response = await asyncio.wait_for(
                client.aio.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        temperature=0.7,
                        max_output_tokens=3000,
                        thinking_config=types.ThinkingConfig(thinking_budget=0),
                    ),
                ),
                timeout=45.0
            )

            text = response.text.strip()
            # Clean markdown formatting if model wrapped response
            cleaned_text = re.sub(r'^```json\s*', '', text, flags=re.IGNORECASE)
            cleaned_text = re.sub(r'\s*```$', '', cleaned_text).strip()

            data = json.loads(cleaned_text)
            if 'response' in data:
                # Ensure actions and suggestions are present
                if 'actions' not in data:
                    data['actions'] = []
                if 'suggestions' not in data:
                    data['suggestions'] = [
                        'Dự báo thời tiết những ngày tới',
                        'Món ăn đặc sản nên thử',
                        'Tối ưu phương tiện di chuyển'
                    ]
                return data

        except Exception as e:
            print(f"⚠️ Gemini chat with model '{model_name}' failed or timed out: {e}")
            continue

    # If all Gemini models fail or rate limit hits, fallback seamlessly to local engine
    print("ℹ️ Falling back to smart local Vietnam travel engine")
    return _generate_smart_local_response(user_message, current_trip)
