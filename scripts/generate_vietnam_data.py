# -*- coding: utf-8 -*-
import json

DESTS = [
    # 06 THÀNH PHỐ TRỰC THUỘC TRUNG ƯƠNG
    {
        "id": "hanoi",
        "name": "TP. Hà Nội",
        "province": "Thủ đô Hà Nội",
        "provinceType": "city",
        "mergedFrom": "Giữ nguyên trạng thái Thủ đô",
        "region": "North",
        "regionName": "Miền Bắc",
        "lat": 21.0285,
        "lng": 105.8542,
        "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
        "description": "Thủ đô ngàn năm văn hiến, trung tâm chính trị văn hóa với 36 phố phường rêu phong, ẩm thực tinh hoa và hàng trăm di tích cổ kính.",
        "tags": ["Thủ đô di sản", "Ẩm thực phố cổ", "Hồ Gươm", "Văn Miếu", "Hồ Tây"],
        "bestSeason": "Tháng 9 - 11 (Mùa thu vàng) & Tháng 2 - 4 (Xuân)",
        "touristSpots": [
            {
                "id": "spot_hn_1",
                "name": "Quần thể Hồ Gươm & 36 Phố Phường",
                "category": "Di sản & Ẩm thực",
                "icon": "🏯",
                "lat": 21.0287,
                "lng": 105.8524,
                "description": "Trái tim của Thủ đô với cầu Thê Húc đỏ son, tháp Rùa cổ kính và mê cung phố nghề ẩm thực truyền thống.",
                "highlightTag": "Biểu tượng Thủ đô",
                "subLocations": [
                    "Hồ Hoàn Kiếm & Đền Ngọc Sơn",
                    "Phố đi bộ & Chợ đêm Hàng Đào",
                    "Nhà thờ Lớn Hà Nội (Kiến trúc Gothic)",
                    "Ô Quan Chưởng & Chợ Đồng Xuân",
                    "Phố ẩm thực Tạ Hiện & Hàng Buồm"
                ],
                "activities": [
                    "Đi dạo ven Hồ Gươm ngắm Tháp Rùa & cầu Thê Húc cầu may mắn",
                    "Thưởng thức Cà phê trứng Giảng & Phở Bát Đàn truyền thống",
                    "Đi xích lô dạo quanh 36 phố phường cổ kính",
                    "Uống bia hơi và ăn nem chua rán trên phố Tạ Hiện về đêm",
                    "Check-in sống ảo tại Nhà thờ Lớn và phố bích họa Phùng Hưng"
                ],
                "foodSpecialties": ["Phở bò Bát Đàn", "Bún chả Hàng Mành", "Chả cá Lã Vọng", "Cà phê trứng Giảng", "Bánh cuốn Thanh Trì"]
            },
            {
                "id": "spot_hn_2",
                "name": "Quần thể Ba Đình - Tây Hồ & Văn Miếu",
                "category": "Lịch sử & Thư giãn",
                "icon": "🏛️",
                "lat": 21.0293,
                "lng": 105.8361,
                "description": "Trung tâm văn hiến ngàn năm với trường đại học đầu tiên của Việt Nam và không gian lộng gió Hồ Tây.",
                "highlightTag": "Di tích quốc gia đặc biệt",
                "subLocations": [
                    "Quảng trường Ba Đình & Lăng Chủ tịch",
                    "Chùa Trấn Quốc (Ngôi chùa cổ nhất Hà Nội)",
                    "Văn Miếu - Quốc Tử Giám",
                    "Hồ Tây & Bến Hàn Quốc",
                    "Hoàng thành Thăng Long di sản UNESCO"
                ],
                "activities": [
                    "Viếng Lăng Bác và tham quan Nhà sàn ao cá Bác Hồ",
                    "Chèo SUP hoặc đạp vịt đón hoàng hôn trên Hồ Tây",
                    "Đi chùa Trấn Quốc thắp hương cầu bình an đầu năm",
                    "Thăm 82 bia Tiến sĩ và xin chữ may mắn tại Văn Miếu",
                    "Thưởng thức bánh tôm giòn rụm và kem Tràng Tiền bên hồ"
                ],
                "foodSpecialties": ["Bánh tôm Hồ Tây", "Bún ốc nguội Tây Hồ", "Cốm xanh Làng Vòng", "Trà sen Tây Hồ"]
            },
            {
                "id": "spot_hn_3",
                "name": "Quần thể Di tích Chùa Hương (Mỹ Đức)",
                "category": "Tâm linh & Cảnh quan",
                "icon": "🛕",
                "lat": 20.6186,
                "lng": 105.7533,
                "description": "Nam thiên đệ nhất động với dòng suối Yến thơ mộng và các ngôi chùa cổ tựa vào vách núi đá vôi.",
                "highlightTag": "Lễ hội tâm linh lớn nhất",
                "subLocations": [
                    "Suối Yến mùa hoa súng nở",
                    "Chùa Thiên Trù (Bếp Trời)",
                    "Động Hương Tích (Nam thiên đệ nhất động)",
                    "Đền Trình & Chùa Giải Oan"
                ],
                "activities": [
                    "Đi thuyền nan xuôi dòng Suối Yến ngắm cảnh non xanh nước biếc",
                    "Đi cáp treo hoặc leo bậc đá vào Động Hương Tích chiêm bái",
                    "Đi chùa thắp hương cầu tự và bình an cho gia đạo",
                    "Thưởng thức rau sắng rừng và dê núi Mỹ Đức"
                ],
                "foodSpecialties": ["Rau sắng Chùa Hương", "Chè củ mài", "Mơ Hương Tích", "Thịt dê núi Mỹ Đức"]
            }
        ]
    },
    {
        "id": "hcm",
        "name": "TP. Hồ Chí Minh",
        "province": "TP. Hồ Chí Minh (mở rộng)",
        "provinceType": "city",
        "mergedFrom": "Hợp nhất TP.HCM, Bình Dương và Bà Rịa - Vũng Tàu",
        "region": "South",
        "regionName": "Miền Nam",
        "lat": 10.8231,
        "lng": 106.6297,
        "image": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80",
        "description": "Đại đô thị kinh tế - du lịch năng động bậc nhất Đông Nam Á, kết nối phố thị phồn hoa với bờ biển ngập tràn nắng gió Vũng Tàu.",
        "tags": ["Đô thị sôi động", "Biển Vũng Tàu", "Bến Thành", "Bến Bạch Đằng", "Địa đạo Củ Chi"],
        "bestSeason": "Tháng 12 - 4 (Mùa khô nắng ấm)",
        "touristSpots": [
            {
                "id": "spot_hcm_1",
                "name": "Trung tâm Bến Nghé & Bến Bạch Đằng",
                "category": "Đô thị & Check-in",
                "icon": "🏙️",
                "lat": 10.7725,
                "lng": 106.6980,
                "description": "Trái tim hiện đại của Sài Gòn với các công trình kiến trúc Pháp cổ xen lẫn tòa tháp chọc trời lung linh ánh đèn.",
                "highlightTag": "Top Check-in Đêm",
                "subLocations": [
                    "Phố đi bộ Nguyễn Huệ",
                    "Chợ Bến Thành lịch sử",
                    "Bến Bạch Đằng & WaterBus sông Sài Gòn",
                    "Bưu điện Trung tâm & Nhà thờ Đức Bà",
                    "Tòa tháp Landmark 81 đài quan sát"
                ],
                "activities": [
                    "Đi bus đường sông WaterBus ngắm hoàng hôn rực rỡ trên sông Sài Gòn",
                    "Thưởng thức Cơm tấm sườn bì chả & Hủ tiếu Nam Vang trứ danh",
                    "Dạo phố đi bộ đêm thưởng thức biểu diễn âm nhạc đường phố",
                    "Lên đài quan sát tầng 81 ngắm trọn vẹn thành phố từ trên cao",
                    "Uống cà phê bệt ngắm Bưu điện cổ kính phong cách châu Âu"
                ],
                "foodSpecialties": ["Cơm tấm sườn bì chả Ba Ghiền", "Bánh mì Huỳnh Hoa", "Hủ tiếu Nam Vang", "Phá lấu bò"]
            },
            {
                "id": "spot_hcm_2",
                "name": "Thành phố Biển Vũng Tàu",
                "category": "Nghỉ dưỡng biển",
                "icon": "🏖️",
                "lat": 10.3340,
                "lng": 107.0860,
                "description": "Bờ biển xanh lộng gió với ngọn hải đăng trăm năm tuổi và các món hải sản thơm ngon quyến rũ.",
                "highlightTag": "Biển đảo nghỉ dưỡng",
                "subLocations": [
                    "Bãi Sau (Bãi Thùy Vân) tắm biển",
                    "Ngọn Hải Đăng cổ Vũng Tàu",
                    "Tượng Chúa Kito Vua (Núi Nhỏ)",
                    "Mũi Nghinh Phong đón gió",
                    "Hòn Bà con đường rẽ biển"
                ],
                "activities": [
                    "Tắm biển Bãi Sau và tham gia mô tô nước, dù lượn bãi biển",
                    "Ăn bánh khọt Cô Ba Vũng Tàu giòn rụm & lẩu cá đuối măng chua",
                    "Leo bậc thang lên cánh tay Tượng Chúa ngắm toàn cảnh biển",
                    "Check-in ngọn hải đăng cổ kính và ăn trứng gà lòng đào",
                    "Đi bộ qua con đường đá giữa biển sang viếng Miếu Hòn Bà"
                ],
                "foodSpecialties": ["Bánh khọt Vũng Tàu", "Lẩu cá đuối măng chua", "Bông lan trứng muối Gốc Cột Điện", "Gỏi cá mai"]
            },
            {
                "id": "spot_hcm_3",
                "name": "Chợ Lớn (Quận 5) & Khu ẩm thực Hoa",
                "category": "Văn hóa & Ẩm thực",
                "icon": "🏮",
                "lat": 10.7538,
                "lng": 106.6578,
                "description": "Không gian di sản văn hóa độc đáo của cộng đồng người Hoa với hội quán cổ kính và thiên đường ẩm thực.",
                "highlightTag": "Phố cổ Sài Gòn",
                "subLocations": [
                    "Chùa Bà Thiên Hậu nghìn năm",
                    "Chợ Bình Tây (Chợ Lớn)",
                    "Phố lồng đèn Lương Nhữ Học",
                    "Hội quán Nghĩa An & Ôn Lăng"
                ],
                "activities": [
                    "Đi chùa Bà Thiên Hậu thắp hương vòng cầu bình an và may mắn",
                    "Thưởng thức Dimsum nóng hổi, sủi cảo và mì kéo sợi truyền thống",
                    "Chụp ảnh check-in phong cách hoài cổ Hong Kong tại các hội quán",
                    "Thưởng thức chè người Hoa 20 vị thanh mát tốt cho sức khỏe"
                ],
                "foodSpecialties": ["Dimsum & Vịt quay", "Sủi cảo Hà Tôn Quyền", "Mì vịt tiềm", "Chè người Hoa"]
            }
        ]
    },
    {
        "id": "danang",
        "name": "TP. Đà Nẵng",
        "province": "TP. Đà Nẵng (mở rộng)",
        "provinceType": "city",
        "mergedFrom": "Hợp nhất TP. Đà Nẵng và tỉnh Quảng Nam",
        "region": "Central",
        "regionName": "Miền Trung",
        "lat": 16.0544,
        "lng": 108.2022,
        "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
        "description": "Thành phố biển đáng sống hàng đầu Việt Nam sở hữu bộ đôi kỳ quan: Cầu Vàng Bà Nà Hills bồng bềnh mây trắng và Đô thị cổ Hội An lung linh đèn lồng.",
        "tags": ["Cầu Vàng", "Phố cổ Hội An", "Biển Mỹ Khê", "Bà Nà Hills", "Sơn Trà"],
        "bestSeason": "Tháng 2 - 8 (Biển êm, nắng vàng)",
        "touristSpots": [
            {
                "id": "spot_dn_1",
                "name": "Quần thể Bà Nà Hills & Cầu Vàng",
                "category": "Kỳ quan & Giải trí",
                "icon": "🌉",
                "lat": 15.9989,
                "lng": 107.9880,
                "description": "Cây cầu tựa đôi bàn tay Phật khổng lồ giữa mây ngàn và quần thể làng Pháp cổ kính bốn mùa se lạnh.",
                "highlightTag": "Kỳ quan thế giới",
                "subLocations": [
                    "Cầu Vàng (Bàn tay Phật khổng lồ)",
                    "Làng Pháp & Quảng trường Nhật Thực",
                    "Công viên giải trí Fantasy Park trong nhà",
                    "Hầm rượu Debay trăm tuổi & Vườn hoa Le Jardin",
                    "Chùa Linh Ứng Bà Nà"
                ],
                "activities": [
                    "Đi cáp treo đạt nhiều kỷ lục thế giới băng qua biển mây đại ngàn",
                    "Check-in Cầu Vàng lúc bình minh khi sương sớm còn vờn qua tay Phật",
                    "Trải nghiệm 4 mùa trong một ngày tại không gian lâu đài châu Âu",
                    "Thưởng thức buffet Á - Âu đỉnh núi và bia tươi thủ công Bà Nà",
                    "Khám phá hầm rượu vang cổ nằm sâu trong lòng núi đá"
                ],
                "foodSpecialties": ["Buffet đỉnh Bà Nà", "Xúc xích Đức nướng than", "Bia thủ công Bà Nà"]
            },
            {
                "id": "spot_dn_2",
                "name": "Đô thị cổ Hội An (Quảng Nam)",
                "category": "Di sản UNESCO",
                "icon": "🏮",
                "lat": 15.8801,
                "lng": 108.3380,
                "description": "Di sản thế giới rực rỡ sắc màu hoa đăng bên dòng sông Hoài thơ mộng, nhà cổ mái ngói rêu phong và đèn lồng huyền ảo.",
                "highlightTag": "Top di sản lãng mạn",
                "subLocations": [
                    "Chùa Cầu Nhật Bản biểu tượng",
                    "Bến thuyền sông Hoài",
                    "Nhà cổ Tấn Ký & Phùng Hưng",
                    "Rừng dừa Bảy Mẫu Cẩm Thanh",
                    "Làng gốm Thanh Hà"
                ],
                "activities": [
                    "Đi thuyền nan thả hoa đăng ước nguyện lung linh trên dòng sông Hoài",
                    "Thưởng thức Cao Lầu, Mì Quảng ếch & Cơm gà Hội An thơm lừng",
                    "Đi thuyền thúng xoay vòng cảm giác mạnh tại Rừng dừa Bảy Mẫu",
                    "Thuê áo dài truyền thống dạo bước chụp ảnh dưới ngàn ngọn đèn lồng",
                    "Thưởng thức nước thảo mộc Mót mát lành và bánh mì Phượng nổi tiếng"
                ],
                "foodSpecialties": ["Cao lầu Hội An", "Mì Quảng ếch Bếp Trang", "Cơm gà Bà Buội", "Bánh mì Phượng", "Nước thảo mộc Mót"]
            },
            {
                "id": "spot_dn_3",
                "name": "Bán đảo Sơn Trà & Bãi biển Mỹ Khê",
                "category": "Biển & Thiên nhiên",
                "icon": "🏖️",
                "lat": 16.0601,
                "lng": 108.2468,
                "description": "Bãi biển quyến rũ hàng đầu hành tinh kết hợp cùng lá phổi xanh Sơn Trà với tượng Phật Bà 67m hướng biển Đông.",
                "highlightTag": "Nghỉ dưỡng biển 5 sao",
                "subLocations": [
                    "Chùa Linh Ứng Sơn Trà (Tượng Phật Bà 67m)",
                    "Bãi biển Mỹ Khê cát trắng mịn",
                    "Đỉnh Bàn Cờ tiên cảnh",
                    "Cầu Rồng phun lửa & sông Hàn",
                    "Cây đa ngàn năm tuổi"
                ],
                "activities": [
                    "Tắm biển Mỹ Khê và trải nghiệm lướt sóng, dù lượn trên cao",
                    "Viếng Chùa Linh Ứng cầu bình an và ngắm trọn vịnh Đà Nẵng",
                    "Lên đỉnh Bàn Cờ săn mây và đánh cờ cùng tiên ông",
                    "Xem Cầu Rồng phun lửa và nước vào mỗi tối cuối tuần",
                    "Ăn hải sản tươi sống Năm Đảnh và bánh tráng cuốn thịt heo hai đầu da"
                ],
                "foodSpecialties": ["Bánh tráng cuốn thịt heo hai đầu da", "Hải sản tươi Năm Đảnh", "Bún chả cá Đà Nẵng", "Chè sầu Liên"]
            }
        ]
    },
    {
        "id": "haiphong",
        "name": "TP. Hải Phòng",
        "province": "TP. Hải Phòng (mở rộng)",
        "provinceType": "city",
        "mergedFrom": "Hợp nhất TP. Hải Phòng và tỉnh Hải Dương",
        "region": "North",
        "regionName": "Miền Bắc",
        "lat": 20.8449,
        "lng": 106.6881,
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "description": "Thành phố Hoa phượng đỏ kiêu hãnh sở hữu Quần đảo Cát Bà di sản thiên nhiên thế giới, Vịnh Lan Hạ tuyệt mỹ và đất địa linh nhân kiệt Côn Sơn Kiếp Bạc.",
        "tags": ["Vịnh Lan Hạ", "Đảo Cát Bà", "Food Tour Hải Phòng", "Côn Sơn Kiếp Bạc"],
        "bestSeason": "Tháng 4 - 10 (Mùa biển đẹp)",
        "touristSpots": [
            {
                "id": "spot_hp_1",
                "name": "Quần đảo Cát Bà & Vịnh Lan Hạ",
                "category": "Biển đảo & Sinh quyển",
                "icon": "🏝️",
                "lat": 20.7275,
                "lng": 107.0450,
                "description": "Khu dự trữ sinh quyển thế giới với hàng trăm bãi tắm cát tự nhiên nép mình dưới chân các đảo đá vôi xanh biếc.",
                "highlightTag": "Di sản thiên nhiên thế giới UNESCO",
                "subLocations": [
                    "Vịnh Lan Hạ (Chèo Kayak hang Sáng Tối)",
                    "Vườn quốc gia Cát Bà (Trekking Đỉnh Ngự Lâm)",
                    "Làng chài cổ Cái Bèo lâu đời nhất",
                    "Bãi tắm Cát Cò 1, 2, 3"
                ],
                "activities": [
                    "Đi du thuyền tham quan Vịnh Lan Hạ và chèo Kayak luồn qua hang Sáng Tối",
                    "Trekking xuyên rừng nguyên sinh Vườn quốc gia Cát Bà ngắm Voọc Cát Bà quý hiếm",
                    "Thăm làng chài cổ Cái Bèo thưởng thức tu hài, cá song tươi sống trên bè",
                    "Tắm biển tại bãi Cát Cò và đi bộ trên đường mòn vách đá ven biển ngắm hoàng hôn"
                ],
                "foodSpecialties": ["Tu hài Cát Bà nướng mỡ hành", "Bề bề rang muối", "Cá song hấp xì dầu", "Mực một nắng"]
            },
            {
                "id": "spot_hp_2",
                "name": "Thiên đường Food Tour Hải Phòng",
                "category": "Ẩm thực đường phố",
                "icon": "🍜",
                "lat": 20.8580,
                "lng": 106.6800,
                "description": "Trải nghiệm ẩm thực đường phố sôi động nức tiếng giới trẻ với các món ăn mang đậm hương vị biển cả.",
                "highlightTag": "Food Tour Hot nhất miền Bắc",
                "subLocations": [
                    "Chợ Lương Văn Can thiên đường ăn vặt",
                    "Chợ Cát Bi (Chợ ăn vặt buổi chiều)",
                    "Ga Hải Phòng kiến trúc Pháp",
                    "Phố đi bộ Tam Bạc ven sông"
                ],
                "activities": [
                    "Thuê xe máy oanh tạc bản đồ Food Tour Hải Phòng thưởng thức hơn 20 món ngon",
                    "Thưởng thức Bánh đa cua bể Bà Cụ nước dùng ngọt lịm từ gạch cua đồng",
                    "Ăn bánh mì que Cay cay nồng chấm tương ớt Chí Chương gia truyền",
                    "Thưởng thức cà phê cốt dừa cô Hạnh béo ngậy và chè dừa dầm mát lạnh"
                ],
                "foodSpecialties": ["Bánh đa cua bể Hải Phòng", "Bánh mì cay Pate", "Cà phê cốt dừa", "Dừa dầm", "Ốc xào cay Hải Phòng"]
            },
            {
                "id": "spot_hp_3",
                "name": "Quần thể Di tích Côn Sơn - Kiếp Bạc (Hải Dương)",
                "category": "Di tích lịch sử",
                "icon": "🏯",
                "lat": 21.1390,
                "lng": 106.4010,
                "description": "Vùng đất thiêng gắn liền với cuộc đời vị anh hùng dân tộc Trần Hưng Đạo và đại danh nhân văn hóa thế giới Nguyễn Trãi.",
                "highlightTag": "Di tích quốc gia đặc biệt",
                "subLocations": [
                    "Đền Kiếp Bạc bên dòng sông Lục Đầu",
                    "Chùa Côn Sơn (Tư Phúc Tự)",
                    "Thạch Bàn nơi Nguyễn Trãi ngồi làm thơ",
                    "Đỉnh Ngũ Nhạc linh từ"
                ],
                "activities": [
                    "Dâng hương tưởng niệm Đức Thánh Trần tại Đền Kiếp Bạc linh thiêng",
                    "Thăm Chùa Côn Sơn dạo bước dưới bóng rừng thông reo ngút ngàn",
                    "Ngồi nghỉ trên Thạch Bàn ngắm suối Côn Sơn chảy rì rầm như tiếng đàn cầm",
                    "Thưởng thức bánh đậu xanh Hải Dương truyền thống và bánh gai Ninh Giang"
                ],
                "foodSpecialties": ["Bánh đậu xanh Rồng Vàng", "Bánh gai Ninh Giang", "Rươi Tứ Kỳ", "Vải thiều Thanh Hà"]
            }
        ]
    },
    {
        "id": "cantho",
        "name": "TP. Cần Thơ",
        "province": "Cần Thơ, Hậu Giang & Sóc Trăng",
        "provinceType": "city",
        "mergedFrom": "Hợp nhất TP. Cần Thơ, Hậu Giang và Sóc Trăng",
        "region": "South",
        "regionName": "Miền Nam",
        "lat": 10.0452,
        "lng": 105.7469,
        "image": "https://images.unsplash.com/photo-1622308644420-a681329c0d50?auto=format&fit=crop&w=800&q=80",
        "description": "Thủ phủ Tây Đô sông nước trù phú với Chợ nổi Cái Răng tấp nập thuyền bè, Bến Ninh Kiều thi vị và các ngôi chùa Khmer Sóc Trăng lộng lẫy.",
        "tags": ["Chợ nổi Cái Răng", "Bến Ninh Kiều", "Chùa Dơi", "Sóc Trăng", "Lẩu mắm"],
        "bestSeason": "Tháng 9 - 11 (Mùa nước nổi) & Tháng 5 - 8 (Mùa trái cây chín rộ)",
        "touristSpots": [
            {
                "id": "spot_ct_1",
                "name": "Chợ nổi Cái Răng & Bến Ninh Kiều",
                "category": "Văn hóa sông nước",
                "icon": "🛶",
                "lat": 10.0035,
                "lng": 105.7460,
                "description": "Nét văn hóa giao thương độc đáo trên sông Tiền, sông Hậu với cây bẹo treo hàng và ghe thuyền buôn bán rộn rã.",
                "highlightTag": "Di sản văn hóa phi vật thể",
                "subLocations": [
                    "Chợ nổi Cái Răng đón bình minh",
                    "Bến Ninh Kiều & Cầu Tình Yêu Cần Thơ",
                    "Nhà cổ Bình Thủy (Bối cảnh phim 'Người Tình')",
                    "Lò hủ tiếu truyền thống Chín Của"
                ],
                "activities": [
                    "Đi ghe sáng sớm ăn tô hủ tiếu nóng hổi và uống cà phê lắc ngay trên sông nước",
                    "Dạo bến Ninh Kiều lung linh ánh đèn và ngắm cầu Cần Thơ về đêm",
                    "Thăm Nhà cổ Bình Thủy chiêm ngưỡng kiến trúc Đông - Tây kết hợp trăm năm tuổi",
                    "Trải nghiệm tự tay tráng bánh và thưởng thức hủ tiếu pizza chiên giòn",
                    "Thưởng thức Lẩu mắm Dạ Lý và Vịt nấu chao đậm đà phong vị Nam Bộ"
                ],
                "foodSpecialties": ["Lẩu mắm Dạ Lý Cần Thơ", "Vịt nấu chao Thành Giao", "Bánh cống Cần Thơ", "Hủ tiếu pizza chiên giòn"]
            },
            {
                "id": "spot_ct_2",
                "name": "Quần thể Chùa Khmer & Chùa Dơi (Sóc Trăng)",
                "category": "Kiến trúc & Tâm linh",
                "icon": "🛕",
                "lat": 9.5890,
                "lng": 105.9750,
                "description": "Quần thể chùa Khmer cổ kính lộng lẫy với hoa văn dát vàng, nơi đàn dơi ngựa tự nhiên hàng vạn con sinh sống kỳ bí.",
                "highlightTag": "Kiến trúc Phật giáo Nam tông",
                "subLocations": [
                    "Chùa Dơi (Mahatup) cổ tự",
                    "Chùa Chén Kiểu (Sro Lôn) khảm chén đĩa sành",
                    "Chùa Som Rong (Tượng Phật Thích Ca nằm khổng lồ)",
                    "Khu du lịch sinh thái Lung Ngọc Hoàng (Hậu Giang)"
                ],
                "activities": [
                    "Chiêm ngưỡng kiến trúc chùa Khmer mái vút cong và tượng thần Nagar",
                    "Tận mắt ngắm đàn dơi ngựa tự nhiên hàng vạn con treo mình trên cây cổ thụ Chùa Dơi",
                    "Check-in tượng Phật nằm dài 63m uy nghiêm tại Chùa Som Rong",
                    "Thưởng thức Bánh pía sầu riêng tươi Sóc Trăng bóc từng lớp vỏ mỏng mịn",
                    "Thưởng thức tô Bún nước lèo Sóc Trăng ngát mùi sả và ngải bún"
                ],
                "foodSpecialties": ["Bánh pía Sóc Trăng sầu riêng trứng muối", "Bún nước lèo Sóc Trăng", "Bánh cóng Đại Tâm"]
            }
        ]
    },
    {
        "id": "hue",
        "name": "TP. Huế",
        "province": "Thành phố Huế",
        "provinceType": "city",
        "mergedFrom": "Giữ nguyên trạng thái Cố đô di sản",
        "region": "Central",
        "regionName": "Miền Trung",
        "lat": 16.4637,
        "lng": 107.5909,
        "image": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80",
        "description": "Cố đô vàng son bên dòng sông Hương thơ mộng, nơi lưu giữ tinh hoa 13 triều vua Nguyễn với quần thể Đại Nội, lăng tẩm uy nghiêm và ẩm thực cung đình trứ danh.",
        "tags": ["Cố đô Huế", "Đại Nội", "Sông Hương", "Lăng Khải Định", "Bún bò Huế"],
        "bestSeason": "Tháng 1 - 4 (Mát mẻ, mùa hoa ngô đồng) & Tháng 5 - 8",
        "touristSpots": [
            {
                "id": "spot_hue_1",
                "name": "Quần thể Di tích Cố đô & Đại Nội Huế",
                "category": "Di sản Hoàng cung",
                "icon": "🏯",
                "lat": 16.4699,
                "lng": 107.5794,
                "description": "Trái tim của triều đại phong kiến cuối cùng ở Việt Nam với cổng Ngọ Môn sừng sững, Điện Thái Hòa dát vàng và Tử Cấm Thành thâm nghiêm.",
                "highlightTag": "Di sản văn hóa thế giới UNESCO",
                "subLocations": [
                    "Cổng Ngọ Môn & Kỳ Đài Huế",
                    "Điện Thái Hòa & Tử Cấm Thành",
                    "Cung Diên Thọ & Thái Bình Lâu",
                    "Bảo tàng Cổ vật Cung đình Huế",
                    "Chợ Đông Ba mua đặc sản"
                ],
                "activities": [
                    "Thuê cổ phục triều Nguyễn (Áo Nhật Bình, Ngũ Thân) chụp ảnh trong Hoàng Thành",
                    "Xem nghi lễ đổi gác tái hiện không khí hoàng gia thời xưa",
                    "Thưởng thức Nhã nhạc Cung đình Huế tại Duyệt Thị Đường",
                    "Đi chợ Đông Ba thưởng thức Bún bò Huế, bánh bèo, nậm, lọc và mua mè xửng",
                    "Check-in thưởng thức 20 món chè cung đình Huế ngọt thanh tại hẻm chè Hùng Vương"
                ],
                "foodSpecialties": ["Bún bò Huế Mụ Rơi", "Bánh bèo, nậm, lọc", "Cơm hến Cồn Hến", "Chè bột lọc bọc heo quay", "Mè xửng Thiên Hương"]
            },
            {
                "id": "spot_hue_2",
                "name": "Dòng Sông Hương & Các Lăng Tẩm Hoàng Gia",
                "category": "Cảnh quan & Lịch sử",
                "icon": "⛵",
                "lat": 16.4520,
                "lng": 107.5850,
                "description": "Dòng sông thơ mộng soi bóng ngôi chùa cổ kính Thiên Mụ cùng kiệt tác kiến trúc lăng tẩm Khải Định, Tự Đức, Minh Mạng.",
                "highlightTag": "Thi ca & Hội họa xứ Huế",
                "subLocations": [
                    "Chùa Thiên Mụ & Tháp Phước Duyên",
                    "Lăng Khải Định (Kiệt tác khảm sành sứ)",
                    "Lăng Tự Đức (Không gian thơ mộng hữu tình)",
                    "Đồi Vọng Cảnh ngắm hoàng hôn sông Hương",
                    "Làng hương Thủy Xuân rực rỡ"
                ],
                "activities": [
                    "Đi thuyền rồng xuôi dòng sông Hương nghe ca Huế và thả đèn hoa đăng cầu may",
                    "Viếng Chùa Thiên Mụ thắp hương cầu an và ngắm chuông đồng ngân vang",
                    "Chiêm ngưỡng nghệ thuật khảm sành sứ đỉnh cao phương Đông & Tây tại Lăng Khải Định",
                    "Check-in làng hương Thủy Xuân rực rỡ sắc màu và học làm nón bài thơ",
                    "Đón hoàng hôn lãng mạn trên Đồi Vọng Cảnh ngắm khúc cua sông Hương đẹp như tranh"
                ],
                "foodSpecialties": ["Nem lụi chợ Đông Ba", "Bánh khoái hoàng cung", "Trà Cung Đình Huế", "Bánh ép Huế"]
            }
        ]
    }
]

print("Script template ready.")

