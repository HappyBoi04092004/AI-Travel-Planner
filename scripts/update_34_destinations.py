# -*- coding: utf-8 -*-
"""
Generate the full 34 Vietnam Destinations for frontend/src/data/vietnamData.ts
with comprehensive tourist clusters (tụ điểm), sub-locations, specific activities
(đi thuyền, ăn dê núi, đi chùa, đi đền thờ...), and food specialties.
"""

DESTINATIONS_DATA = [
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
    },

    # 28 TỈNH SAU SÁP NHẬP
    {
        "id": "ninhbinh",
        "name": "Tỉnh Ninh Bình",
        "province": "Ninh Bình, Hà Nam & Nam Định",
        "provinceType": "province",
        "mergedFrom": "Hợp nhất tỉnh Ninh Bình, Hà Nam và Nam Định",
        "region": "North",
        "regionName": "Miền Bắc",
        "lat": 20.2506,
        "lng": 105.9745,
        "image": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
        "description": "Vùng đất cố đô di sản thế giới kép Tràng An, nơi hội tụ thung lũng đá vôi ngoạn mục, cố đô Hoa Lư lịch sử, đại chùa Bái Đính và Tam Chúc khổng lồ.",
        "tags": ["Cố đô Hoa Lư", "Tràng An", "Hang Múa", "Chùa Bái Đính", "Dê núi Cơm cháy"],
        "bestSeason": "Tháng 1 - 3 (Lễ hội xuân) & Tháng 5 - 6 (Mùa lúa vàng Tam Cốc)",
        "touristSpots": [
            {
                "id": "spot_nb_1",
                "name": "Cố đô Hoa Lư (Khu Di tích Lịch sử)",
                "category": "Di tích & Lịch sử",
                "icon": "🏛️",
                "lat": 20.2858,
                "lng": 105.9048,
                "description": "Kinh đô đầu tiên của nhà nước phong kiến tập quyền Việt Nam thế kỷ X với núi non bao bọc tựa bức tường thành thiên nhiên kiên cố.",
                "highlightTag": "Kinh đô đầu tiên của nước Việt",
                "subLocations": [
                    "Đền Vua Đinh Tiên Hoàng",
                    "Đền Vua Lê Đại Hành",
                    "Chùa Nhất Trụ (Chùa Cột Kinh ngàn năm)",
                    "Động Am Tiên (Tuyệt Tịnh Cốc Ninh Bình)",
                    "Núi Mã Yên & Lăng mộ Vua Đinh"
                ],
                "activities": [
                    "Đi thuyền ngắm cảnh hồ nước xanh biếc tại Động Am Tiên (Tuyệt Tịnh Cốc)",
                    "Ăn đặc sản thịt Dê núi nướng tảng thơm lừng & Cơm cháy Ninh Bình giòn rụm",
                    "Đi chùa Nhất Trụ thắp hương vãn cảnh và chiêm bái Cột kinh Phật đá nghìn năm",
                    "Đi đền thờ Vua Đinh Tiên Hoàng & Vua Lê Đại Hành dâng hương tìm hiểu lịch sử",
                    "Chinh phục đỉnh núi Mã Yên viếng lăng vua và phóng tầm mắt ngắm trọn thung lũng cố đô"
                ],
                "foodSpecialties": ["Thịt dê núi nướng tảng", "Cơm cháy giòn chấm sốt dê", "Rượu Kim Sơn", "Nem chua Yên Mạc"]
            },
            {
                "id": "spot_nb_2",
                "name": "Quần thể Danh thắng Tràng An & Hang Múa",
                "category": "Kỳ quan thiên nhiên",
                "icon": "🚣",
                "lat": 20.2541,
                "lng": 105.9084,
                "description": "Di sản thế giới kép UNESCO chèo thuyền nan len lỏi qua hang động nước và chinh phục đỉnh Hang Múa ngắm thung lũng rồng.",
                "highlightTag": "Di sản thế giới kép UNESCO",
                "subLocations": [
                    "Bến thuyền Tràng An (Tuyến hang động nước)",
                    "Đỉnh Hang Múa (Vạn Lý Trường Thành thu nhỏ)",
                    "Phim trường King Kong (Đảo Đầu Lâu)",
                    "Vườn chim Thung Nham & Động Thiên Hà"
                ],
                "activities": [
                    "Đi thuyền nan luồn lách qua 12 hang động ngầm thạch nhũ lung linh",
                    "Chinh phục 500 bậc đá lên đỉnh Hang Múa check-in ngắm sông Ngô Đồng mùa lúa chín",
                    "Chèo thuyền Kayak tự do giữa thung lũng đá vôi kỳ vĩ",
                    "Đi thuyền vào vườn chim Thung Nham ngắm hàng vạn cánh cò trắng về tổ lúc hoàng hôn"
                ],
                "foodSpecialties": ["Ốc núi luộc sả ớt", "Cá rô Tổng Trường chiên xù", "Gà đồi Tràng An nướng mật ong"]
            },
            {
                "id": "spot_nb_3",
                "name": "Quần thể Tâm linh Bái Đính - Tam Chúc",
                "category": "Tâm linh & Kiến trúc",
                "icon": "🛕",
                "lat": 20.2685,
                "lng": 105.8672,
                "description": "Quần thể đại tự tâm linh nắm giữ hàng loạt kỷ lục châu Á, nối liền đất thiêng Ninh Bình và Hà Nam.",
                "highlightTag": "Kỷ lục châu Á",
                "subLocations": [
                    "Chùa Bái Đính cổ & Quần thể Bái Đính mới",
                    "Chùa Tam Chúc lớn nhất thế giới (Hà Nam)",
                    "Hồ Lục Nhạc & Đình Tam Chúc giữa hồ",
                    "Bảo tháp 13 tầng & Hành lang 500 vị La Hán"
                ],
                "activities": [
                    "Đi xe điện & chiêm bái Đại tượng Phật bằng đồng dát vàng lớn nhất Đông Nam Á",
                    "Đi du thuyền trên hồ Tam Chúc ngắm phong cảnh tiên cảnh sơn thủy hữu tình",
                    "Dạo bước hành lang 500 vị La Hán đá xanh tinh xảo",
                    "Thưởng thức tiệc buffet cơm chay thanh tịnh tại nhà hàng chùa"
                ],
                "foodSpecialties": ["Cơm chay Bái Đính", "Bánh đa cua Phủ Lý", "Chuối ngự Đại Hoàng", "Cá kho làng Vũ Đại"]
            }
        ]
    },
    {
        "id": "laocai",
        "name": "Tỉnh Lào Cai",
        "province": "Lào Cai & Yên Bái",
        "provinceType": "province",
        "mergedFrom": "Hợp nhất tỉnh Lào Cai và Yên Bái",
        "region": "North",
        "regionName": "Miền Bắc",
        "lat": 22.3364,
        "lng": 103.8438,
        "image": "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=800&q=80",
        "description": "Vùng cao Tây Bắc hùng vĩ với đỉnh Fansipan nóc nhà Đông Dương, thị trấn Sa Pa trong sương và kiệt tác ruộng bậc thang Mù Cang Chải vàng óng.",
        "tags": ["Sa Pa", "Fansipan", "Mù Cang Chải", "Đèo Ô Quý Hồ", "Bản Cát Cát"],
        "bestSeason": "Tháng 9 - 10 (Mùa lúa chín) & Tháng 12 - 2 (Săn tuyết & Lễ hội)",
        "touristSpots": [
            {
                "id": "spot_lc_1",
                "name": "Thị trấn Sa Pa & Nóc nhà Đông Dương Fansipan",
                "category": "Kỳ quan & Núi cao",
                "icon": "⛰️",
                "lat": 22.3033,
                "lng": 103.7753,
                "description": "Chinh phục đỉnh Fansipan 3.143m bồng bềnh mây trắng, khám phá bản làng H’Mông và tận hưởng khí hậu se lạnh bốn mùa.",
                "highlightTag": "Nóc nhà Đông Dương",
                "subLocations": [
                    "Đỉnh Fansipan 3.143m & Quần thể tâm linh trên mây",
                    "Bản Cát Cát của người H’Mông",
                    "Tàu hỏa leo núi Mường Hoa",
                    "Nhà thờ Đá cổ Sa Pa & Quảng trường",
                    "Đèo Ô Quý Hồ & Cầu kính Rồng Mây"
                ],
                "activities": [
                    "Chinh phục đỉnh Fansipan bằng cáp treo 3 dây hiện đại và chạm tay vào cột mốc 3.143m",
                    "Đi tàu hỏa leo núi ngắm thung lũng hoa Mường Hoa bạt ngàn",
                    "Thuê trang phục dân tộc H’Mông chụp ảnh check-in suối Tiên Sa tại bản Cát Cát",
                    "Ăn lẩu cá hồi, cá tầm nóng hổi và xiên nướng chợ đêm Sa Pa",
                    "Săn hoàng hôn biển mây tại Cổng trời Đèo Ô Quý Hồ - một trong tứ đại đỉnh đèo"
                ],
                "foodSpecialties": ["Lẩu cá hồi & cá tầm Sa Pa", "Thịt lợn cắp nách nướng than", "Thắng cố ngựa Mường Khương", "Cơm lam nướng ống tre"]
            },
            {
                "id": "spot_lc_2",
                "name": "Danh thắng Ruộng bậc thang Mù Cang Chải (Yên Bái)",
                "category": "Danh lam di sản",
                "icon": "🌾",
                "lat": 21.8540,
                "lng": 104.0850,
                "description": "Kiệt tác ruộng bậc thang vàng rực trải dài trên sườn núi do bàn tay đồng bào người Mông kiến tạo qua hàng trăm năm.",
                "highlightTag": "Di tích quốc gia đặc biệt",
                "subLocations": [
                    "Đồi Mâm Xôi La Pán Tẩn",
                    "Đồi Móng Ngựa Sáng Nhù",
                    "Đèo Khau Phạ (Điểm dù lượn)",
                    "Suối khoáng nóng Trạm Tấu",
                    "Bản Lìm Mông yên bình"
                ],
                "activities": [
                    "Săn ảnh ruộng bậc thang mùa lúa chín vàng óng vào tháng 9 - tháng 10",
                    "Bay dù lượn 'Bay trên mùa vàng' từ đỉnh đèo Khau Phạ ngắm trọn thung lũng",
                    "Tắm suối khoáng nóng tự nhiên Trạm Tấu thư giãn giữa mây ngàn",
                    "Thưởng thức xôi nếp nương Tú Lệ dẻo thơm và cốm xanh nức tiếng"
                ],
                "foodSpecialties": ["Xôi nếp nương Tú Lệ", "Cốm xanh Tú Lệ", "Thịt trâu gác bếp", "Cá suối chiên giòn"]
            }
        ]
    },
    {
        "id": "quangninh",
        "name": "Tỉnh Quảng Ninh",
        "province": "Quảng Ninh",
        "provinceType": "province",
        "mergedFrom": "Giữ nguyên trạng thái tỉnh động lực",
        "region": "North",
        "regionName": "Miền Bắc",
        "lat": 20.9505,
        "lng": 107.0734,
        "image": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
        "description": "Thiên đường biển đảo với Di sản thiên nhiên thế giới Vịnh Hạ Long, quần thể giải trí Sun World hiện đại và thánh địa Phật giáo Yên Tử linh thiêng.",
        "tags": ["Vịnh Hạ Long", "Bãi Cháy", "Yên Tử", "Sun World", "Chả mực"],
        "bestSeason": "Tháng 4 - 10 (Tắm biển & Du thuyền) & Tháng 1 - 3 (Hành hương Yên Tử)",
        "touristSpots": [
            {
                "id": "spot_qn_1",
                "name": "Di sản Thiên nhiên Thế giới Vịnh Hạ Long",
                "category": "Kỳ quan thế giới",
                "icon": "⛵",
                "lat": 20.9101,
                "lng": 107.0850,
                "description": "Hàng ngàn hòn đảo đá vôi nhô lên từ làn nước xanh ngọc bích, ẩn chứa hệ thống hang động thạch nhũ hàng triệu năm tuổi.",
                "highlightTag": "Kỳ quan thiên nhiên thế giới UNESCO",
                "subLocations": [
                    "Hang Sửng Sốt & Động Thiên Cung",
                    "Đảo Ti Tốp (Tắm biển & Ngắm toàn cảnh)",
                    "Hang Luồn (Chèo Kayak)",
                    "Làng chài Cửa Vạn trên biển",
                    "Hòn Trống Mái biểu tượng"
                ],
                "activities": [
                    "Nghỉ đêm trên du thuyền 5 sao ngắm hoàng hôn và bình minh kỳ ảo trên vịnh",
                    "Chèo thuyền Kayak xuyên qua vòm đá Hang Luồn tĩnh lặng",
                    "Tắm biển tại Đảo Ti Tốp và leo 400 bậc đá lên đỉnh ngắm toàn cảnh Vịnh Hạ Long 360 độ",
                    "Thưởng thức tiệc hải sản tươi sống và chả mực giã tay Hạ Long giòn sần sật",
                    "Khám phá Hang Sửng Sốt với lòng hang rộng lớn lộng lẫy như cung điện ngầm"
                ],
                "foodSpecialties": ["Chả mực Hạ Long giã tay", "Sá sùng xào tỏi", "Sam biển nướng mỡ hành", "Bún bề bề Hạ Long"]
            },
            {
                "id": "spot_qn_2",
                "name": "Trung tâm Du lịch Bãi Cháy & Sun World",
                "category": "Giải trí & Biển",
                "icon": "🎡",
                "lat": 20.9575,
                "lng": 107.0370,
                "description": "Tổ hợp vui chơi giải trí ven biển quy mô lớn bậc nhất miền Bắc với công viên nước, cáp treo vượt biển và bãi tắm cát trắng.",
                "highlightTag": "Tổ hợp giải trí hàng đầu",
                "subLocations": [
                    "Công viên Rồng & Công viên nước Vịnh Lốc Xoáy",
                    "Cáp treo Nữ Hoàng & Vòng quay Mặt Trời",
                    "Bãi biển Bãi Cháy",
                    "Phố cổ Bãi Cháy & Chợ đêm Hạ Long"
                ],
                "activities": [
                    "Đi cáp treo Nữ Hoàng ngắm toàn cảnh Vịnh Hạ Long và cầu Bãi Cháy từ trên cao",
                    "Vui chơi sảng khoái với hàng chục máng trượt cảm giác mạnh tại công viên nước",
                    "Tắm biển Bãi Cháy và tham gia mô tô nước, dù bay trên biển",
                    "Dạo phố cổ Bãi Cháy ăn sữa chua trân châu Hạ Long và hải sản đêm"
                ],
                "foodSpecialties": ["Sữa chua trân châu Hạ Long", "Bánh gật gù Tiên Yên", "Cù kỳ hấp sả"]
            },
            {
                "id": "spot_qn_3",
                "name": "Khu Di tích Danh thắng Yên Tử",
                "category": "Tâm linh & Cổ kính",
                "icon": "🏯",
                "lat": 21.1550,
                "lng": 106.7210,
                "description": "Cái nôi của Thiền phái Trúc Lâm do Phật hoàng Trần Nhân Tông sáng lập, nơi mây ngàn ôm ấp những ngôi chùa cổ kính.",
                "highlightTag": "Thánh địa Phật giáo Việt Nam",
                "subLocations": [
                    "Chùa Hoa Yên cổ",
                    "Chùa Đồng đỉnh núi Yên Tử cao 1.068m",
                    "Khu nghỉ dưỡng Làng Nương Yên Tử",
                    "Suối Giải Oan & Vườn Tháp Huệ Quang"
                ],
                "activities": [
                    "Hành hương leo đỉnh Phù Vân viếng Chùa Đồng cầu quốc thái dân an",
                    "Đi cáp treo băng qua rừng trúc xanh ngút ngàn và biển mây trắng",
                    "Trải nghiệm phong cách nghỉ dưỡng thiền tịnh cổ trang tại Làng Nương",
                    "Thưởng thức măng trúc Yên Tử luộc chấm muối vừng thanh đạm"
                ],
                "foodSpecialties": ["Măng trúc Yên Tử", "Chè lam Yên Tử", "Rượu mơ Yên Tử"]
            }
        ]
    },
    {
        "id": "caobang",
        "name": "Tỉnh Cao Bằng",
        "province": "Cao Bằng",
        "provinceType": "province",
        "mergedFrom": "Giữ nguyên trạng thái địa đầu Tổ quốc",
        "region": "North",
        "regionName": "Miền Bắc",
        "lat": 22.6667,
        "lng": 106.2500,
        "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        "description": "Vùng đất non nước Công viên địa chất toàn cầu UNESCO sở hữu Thác Bản Giốc thác nước tự nhiên đẹp nhất Đông Nam Á và di tích Pác Bó cội nguồn cách mạng.",
        "tags": ["Thác Bản Giốc", "Hang Pác Bó", "Suối Lê-nin", "Động Ngườm Ngao", "Vịt quay 7 vị"],
        "bestSeason": "Tháng 8 - 10 (Thác nhiều nước, lúa chín) & Tháng 11 - 12 (Mùa dã quỳ)",
        "touristSpots": [
            {
                "id": "spot_cb_1",
                "name": "Quần thể Thác Bản Giốc & Động Ngườm Ngao",
                "category": "Kỳ quan thiên nhiên",
                "icon": "🌊",
                "lat": 22.8539,
                "lng": 106.7236,
                "description": "Thác nước tự nhiên xuyên biên giới lớn thứ 4 thế giới, dòng nước đổ cuồn cuộn trắng xóa giữa khung cảnh núi non hùng vĩ.",
                "highlightTag": "Thác nước đẹp nhất Đông Nam Á",
                "subLocations": [
                    "Thác Bản Giốc (Tầng thác chính và thác phụ)",
                    "Động Ngườm Ngao (Kiệt tác thạch nhũ vàng)",
                    "Chùa Phật Tích Trúc Lâm Bản Giốc",
                    "Dòng sông Quây Sơn trong xanh"
                ],
                "activities": [
                    "Đi bè tre tiến sát chân thác nước đón những làn bụi nước mát lạnh tung trắng trời",
                    "Chèo thuyền Kayak hoặc chèo SUP xuôi dòng sông Quây Sơn xanh ngọc bích",
                    "Khám phá Động Ngườm Ngao chiêm ngưỡng thạch nhũ hình đài sen ngược độc nhất vô nhị",
                    "Lên Chùa Trúc Lâm Bản Giốc dâng hương và ngắm trọn toàn cảnh thác nước từ trên cao",
                    "Thưởng thức Vịt quay 7 vị Cao Bằng da giòn bóng bẩy và cá trầm hương nướng"
                ],
                "foodSpecialties": ["Vịt quay 7 vị Cao Bằng", "Cá trầm hương nướng sông Quây Sơn", "Bánh cuốn canh Cao Bằng", "Hạt dẻ Trùng Khánh nướng"]
            },
            {
                "id": "spot_cb_2",
                "name": "Khu Di tích Lịch sử Pác Bó & Suối Lê-nin",
                "category": "Di tích lịch sử",
                "icon": "🏕️",
                "lat": 22.9810,
                "lng": 106.0520,
                "description": "Cội nguồn cách mạng Việt Nam nơi Bác Hồ từng sống và làm việc sau 30 năm bôn ba tìm đường cứu nước, dòng suối Lê-nin xanh như ngọc.",
                "highlightTag": "Di tích quốc gia đặc biệt",
                "subLocations": [
                    "Hang Cốc Bó (Hang Pác Bó nơi Bác Hồ ở)",
                    "Suối Lê-nin làn nước trong vắt nhìn thấy đáy",
                    "Núi Các Mác sừng sững",
                    "Bàn đá Bác Hồ làm việc lịch sử năm 1941",
                    "Cột mốc số 0 đường Hồ Chí Minh"
                ],
                "activities": [
                    "Thăm Hang Pác Bó tìm hiểu cuộc sống giản dị đầy gian lao của Bác Hồ",
                    "Đi dạo ven bờ suối Lê-nin ngắm đàn cá bơi lội dưới làn nước xanh biếc tuyệt mỹ",
                    "Chụp ảnh kỷ niệm bên bàn đá lịch sử và Cột mốc 108 biên giới",
                    "Thưởng thức bánh áp chao nóng hổi và bánh khẩu sli giòn thơm của đồng bào Tày, Nùng"
                ],
                "foodSpecialties": ["Bánh áp chao Cao Bằng", "Khẩu sli Nà Sặm", "Rau dạ hiến xào thịt bò", "Miến dong Phia Đén"]
            }
        ]
    },
    {
        "id": "lamdong",
        "name": "Tỉnh Lâm Đồng",
        "province": "Lâm Đồng, Đắk Nông & Bình Thuận",
        "provinceType": "province",
        "mergedFrom": "Hợp nhất Lâm Đồng, Đắk Nông và Bình Thuận",
        "region": "Central",
        "regionName": "Miền Trung",
        "lat": 11.9404,
        "lng": 108.4583,
        "image": "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80",
        "description": "Vùng đất đa dạng cảnh quan tuyệt mỹ: Từ xứ sở sương mù ngàn hoa Đà Lạt, hồ Tà Đùng 'vịnh Hạ Long Tây Nguyên' đến thiên đường biển cát trắng nắng vàng Mũi Né.",
        "tags": ["Đà Lạt", "Mũi Né", "Hồ Tà Đùng", "Bàu Trắng", "Lẩu gà lá é"],
        "bestSeason": "Tháng 11 - 4 (Mùa hoa dã quỳ, mai anh đào, nắng đẹp)",
        "touristSpots": [
            {
                "id": "spot_ld_1",
                "name": "Thành phố ngàn hoa Đà Lạt & Hồ Xuân Hương",
                "category": "Nghỉ dưỡng & Sống ảo",
                "icon": "🌸",
                "lat": 11.9404,
                "lng": 108.4583,
                "description": "Thành phố tình yêu se lạnh quanh năm với những đồi thông reo, vườn hoa khoe sắc và văn hóa cà phê săn mây độc đáo.",
                "highlightTag": "Thành phố sương mù lãng mạn",
                "subLocations": [
                    "Hồ Xuân Hương & Quảng trường Lâm Viên",
                    "Chợ đêm Đà Lạt (Chợ Âm Phủ)",
                    "Đỉnh Langbiang huyền thoại",
                    "Đồi chè Cầu Đất săn mây",
                    "Ga xe lửa cổ Đà Lạt"
                ],
                "activities": [
                    "Đạp vịt trên mặt hồ Xuân Hương đón sương sớm bảng lảng",
                    "Ăn bánh tráng nướng Đà Lạt giòn rụm & uống sữa đậu nành nóng hổi chợ đêm",
                    "Dậy sớm lên đồi chè Cầu Đất đón bình minh và săn biển mây cuồn cuộn",
                    "Check-in Quảng trường Lâm Viên bên đóa hoa dã quỳ và nụ Atiso khổng lồ",
                    "Thưởng thức Lẩu gà lá é Tao Ngộ và Lẩu bò Ba Toa nghi ngút khói"
                ],
                "foodSpecialties": ["Lẩu gà lá é Tao Ngộ", "Lẩu bò Ba Toa quán Gỗ", "Bánh ướt lòng gà", "Bánh tráng nướng", "Dâu tây tươi Đà Lạt"]
            },
            {
                "id": "spot_ld_2",
                "name": "Đồi cát bay Mũi Né & Phan Thiết (Bình Thuận)",
                "category": "Biển & Sa mạc",
                "icon": "🏜️",
                "lat": 10.9333,
                "lng": 108.2833,
                "description": "Thiên đường sa mạc cát mênh mông ôm lấy bờ biển ngọc, nơi có những đồi cát đổi màu kỳ ảo và gió lộng bốn mùa.",
                "highlightTag": "Sa mạc cát trắng Việt Nam",
                "subLocations": [
                    "Đồi Cát Trắng (Bàu Trắng) & Bàu Sen",
                    "Đồi Cát Bay (Đồi Cát Đỏ)",
                    "Suối Tiên Mũi Né (Hẻm núi đất đỏ)",
                    "Làng chài Mũi Né nhộn nhịp",
                    "Tháp Chàm Poshanư cổ"
                ],
                "activities": [
                    "Lái xe địa hình ATV bốn bánh vượt đỉnh đồi cát Bàu Trắng cảm giác cực mạnh",
                    "Trượt cát bằng máng trượt từ đỉnh đồi dốc ngắm cảnh hồ sen bát ngát",
                    "Lội dòng nước mát lành khám phá hẻm núi đất đỏ tự nhiên tại Suối Tiên",
                    "Thức dậy sớm đón bình minh làng chài và thưởng thức hải sản ghẹ, sò điệp tươi nướng mỡ hành"
                ],
                "foodSpecialties": ["Lẩu thả Mũi Né", "Bánh quai vạc", "Gỏi cá mai Phan Thiết", "Răng mực nướng giòn"]
            },
            {
                "id": "spot_ld_3",
                "name": "Hồ Tà Đùng - Vịnh Hạ Long Tây Nguyên (Đắk Nông)",
                "category": "Kỳ quan sinh thái",
                "icon": "🏝️",
                "lat": 11.8600,
                "lng": 107.9800,
                "description": "Hơn 40 hòn đảo lớn nhỏ nhấp nhô trên mặt hồ xanh biếc phẳng lặng tạo nên cảnh tượng kỳ vĩ như tranh thủy mặc giữa đại ngàn.",
                "highlightTag": "Vịnh Hạ Long giữa đại ngàn",
                "subLocations": [
                    "Lòng hồ Tà Đùng và các ốc đảo xanh",
                    "Cầu kính Tà Đùng ngắm toàn cảnh",
                    "Thác Liêng Nung huyền bí",
                    "Vườn quốc gia Tà Đùng"
                ],
                "activities": [
                    "Đi thuyền du ngoạn lòng hồ len lỏi qua các ốc đảo xanh ngát",
                    "Check-in cầu kính trên đỉnh đồi ngắm trọn vẹn toàn cảnh hồ từ trên cao",
                    "Cắm trại qua đêm bên hồ ngắm dải ngân hà và bầu trời sao Tây Nguyên",
                    "Thưởng thức cá lăng nướng than, cơm lam ống tre và rượu cần người Mạ"
                ],
                "foodSpecialties": ["Cá lăng nướng than lòng hồ", "Cơm lam gà đồi nướng", "Rượu cần Tây Nguyên"]
            }
        ]
    },
    {
        "id": "khanhhoa",
        "name": "Tỉnh Khánh Hòa",
        "province": "Khánh Hòa & Ninh Thuận",
        "provinceType": "province",
        "mergedFrom": "Hợp nhất tỉnh Khánh Hòa và Ninh Thuận",
        "region": "Central",
        "regionName": "Miền Trung",
        "lat": 12.2388,
        "lng": 109.1967,
        "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        "description": "Xứ sở trầm hương biển yến với vịnh Nha Trang quyến rũ, thiên đường giải trí VinWonders và những thềm san hô cổ nghìn năm tại Vịnh Vĩnh Hy - Hang Rái.",
        "tags": ["Vịnh Nha Trang", "VinWonders", "Vịnh Vĩnh Hy", "Hang Rái", "Nem nướng"],
        "bestSeason": "Tháng 1 - 9 (Nắng vàng, biển êm như ngọc)",
        "touristSpots": [
            {
                "id": "spot_kh_1",
                "name": "Vịnh biển Nha Trang & Quần đảo Hòn Mun",
                "category": "Biển đảo & Lặn biển",
                "icon": "🤿",
                "lat": 12.2388,
                "lng": 109.1967,
                "description": "Một trong 29 vịnh biển đẹp nhất thế giới sở hữu khu bảo tồn biển Hòn Mun với hàng trăm loài san hô và sinh vật biển rực rỡ.",
                "highlightTag": "Vịnh biển đẹp nhất thế giới",
                "subLocations": [
                    "Đảo Hòn Mun (Khu bảo tồn san hô)",
                    "Bãi biển Trần Phú trung tâm",
                    "Tháp Bà Ponagar Champa nghìn năm",
                    "Viện Hải dương học Nha Trang",
                    "Suối khoáng nóng Tháp Bà (Tắm bùn)"
                ],
                "activities": [
                    "Đi cano cao tốc tham gia tour lặn biển ngắm rạn san hô ngũ sắc tại Hòn Mun",
                    "Trải nghiệm tắm bùn khoáng nóng thiên nhiên phục hồi năng lượng",
                    "Tham quan Tháp Bà Ponagar thưởng thức điệu múa Chăm truyền thống huyền bí",
                    "Ăn nem nướng Nha Trang Đặng Văn Quyên cuốn bánh tráng giòn và bún sứa chả cá",
                    "Dạo bãi biển đêm và thưởng thức cocktail bên quán bar ven biển lộng gió"
                ],
                "foodSpecialties": ["Nem nướng Ninh Hòa Đặng Văn Quyên", "Bún sứa chả cá Nha Trang", "Bánh căn mực trứng", "Yến sào Khánh Hòa"]
            },
            {
                "id": "spot_kh_2",
                "name": "Thiên đường giải trí VinWonders Hòn Tre",
                "category": "Công viên giải trí",
                "icon": "🎢",
                "lat": 12.2180,
                "lng": 109.2450,
                "description": "Quần thể công viên giải trí đẳng cấp quốc tế trên đảo ngọc với cáp treo vượt biển, công viên nước và các show diễn thực cảnh hoành tráng.",
                "highlightTag": "Công viên giải trí kỷ lục",
                "subLocations": [
                    "Cáp treo vượt biển Hòn Tre",
                    "Công viên nước Water World bên bờ biển",
                    "Khu trò chơi cảm giác mạnh Adventure Land",
                    "Vườn thú Quý Vương King’s Garden",
                    "Show thực cảnh triệu đô Tata Show"
                ],
                "activities": [
                    "Đi cáp treo vượt biển ngắm vịnh Nha Trang toàn cảnh từ độ cao 54m",
                    "Chinh phục đường trượt zipline dài nhất Việt Nam và tàu lượn siêu tốc",
                    "Thưởng thức siêu show diễn thực cảnh đa phương tiện Tata Show triệu đô lúc 19:30",
                    "Khám phá Vườn hoa The World Garden hội tụ ngàn kỳ hoa dị thảo năm châu"
                ],
                "foodSpecialties": ["Tiệc buffet quốc tế đỉnh đồi", "Hải sản nướng trên đảo"]
            },
            {
                "id": "spot_kh_3",
                "name": "Vịnh Vĩnh Hy & Hang Rái (Ninh Thuận)",
                "category": "Kỳ quan thiên nhiên",
                "icon": "🦀",
                "lat": 11.7200,
                "lng": 109.1950,
                "description": "Vịnh biển nguyên sơ nằm lọt thỏm giữa dãy núi đá Vườn quốc gia Núi Chúa và thềm san hô cổ hóa thạch Hang Rái độc nhất vô nhị.",
                "highlightTag": "Vịnh biển hoang sơ tuyệt mỹ",
                "subLocations": [
                    "Vịnh Vĩnh Hy nước trong thấu đáy",
                    "Hang Rái (Thác nước tự nhiên trên biển)",
                    "Vườn nho Thái An trĩu quả",
                    "Cung đường đèo ven biển DT702 đẹp nhất Việt Nam"
                ],
                "activities": [
                    "Đi tàu đáy kính ngắm san hô sống và thưởng thức hải sản trên nhà bè Vĩnh Hy",
                    "Săn bình minh kỳ ảo trên thềm san hô cổ triệu năm tuổi tại Hang Rái",
                    "Tự tay hái nho tươi mọng nước tại vườn và thưởng thức mật nho Ninh Thuận ngọt lịm",
                    "Lái xe máy vi vu trên cung đường đèo ven biển một bên là núi Chúa một bên là biển xanh ngắt"
                ],
                "foodSpecialties": ["Bánh xèo mực nhảy Phan Rang", "Nho tươi & Rượu nho Ninh Thuận", "Thịt cừu nướng thảo mộc"]
            }
        ]
    },
    {
        "id": "angiang",
        "name": "Tỉnh An Giang",
        "province": "An Giang & Kiên Giang",
        "provinceType": "province",
        "mergedFrom": "Hợp nhất tỉnh An Giang và Kiên Giang",
        "region": "South",
        "regionName": "Miền Nam",
        "lat": 10.3833,
        "lng": 105.4167,
        "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        "description": "Vùng đất trù phú miền Tây Nam Bộ kết nối vương quốc rừng tràm sông nước An Giang với hòn Đảo Ngọc Phú Quốc thiên đường biển nhiệt đới.",
        "tags": ["Phú Quốc", "Rừng tràm Trà Sư", "Miếu Bà Chúa Xứ", "Bãi Sao", "Grand World"],
        "bestSeason": "Tháng 11 - 4 (Phú Quốc biển êm) & Tháng 9 - 11 (Mùa nước nổi)",
        "touristSpots": [
            {
                "id": "spot_ag_1",
                "name": "Thành phố Đảo Phú Quốc (Đảo Ngọc)",
                "category": "Thiên đường biển đảo",
                "icon": "🏝️",
                "lat": 10.2899,
                "lng": 103.9840,
                "description": "Đảo ngọc lớn nhất Việt Nam với bãi cát trắng mịn như kem, hệ thống cáp treo vượt biển kỷ lục thế giới và các tổ hợp giải trí không ngủ.",
                "highlightTag": "Đảo du lịch hàng đầu thế giới",
                "subLocations": [
                    "Grand World Phú Quốc (Thành phố không ngủ)",
                    "Cáp treo Hòn Thơm vượt biển dài nhất thế giới",
                    "Bãi Sao cát trắng mịn như kem",
                    "Vinpearl Safari công viên bán hoang dã",
                    "Sunset Sanato & Chợ đêm Phú Quốc"
                ],
                "activities": [
                    "Đi cáp treo 3 dây Hòn Thơm dài 7.899m ngắm quần đảo An Thới ngoạn mục",
                    "Xem show diễn thực cảnh Tinh Hoa Việt Nam và Sắc Màu Venice tại Grand World",
                    "Tắm biển Bãi Sao và thưởng thức gỏi cá trích tươi rói cuốn bánh tráng",
                    "Ngắm hoàng hôn biểu tượng tại Sunset Sanato với các tượng điêu khắc nghệ thuật",
                    "Ăn bún quậy Kiến Xây tự pha nước chấm và hải sản nướng chợ đêm Bạch Đằng"
                ],
                "foodSpecialties": ["Gỏi cá trích Phú Quốc", "Bún quậy Kiến Xây", "Còi biên mai nướng muối ớt", "Nước mắm Phú Quốc truyền thống"]
            },
            {
                "id": "spot_ag_2",
                "name": "Rừng tràm Trà Sư & Miếu Bà Chúa Xứ (An Giang)",
                "category": "Sông nước & Tâm linh",
                "icon": "🛶",
                "lat": 10.6050,
                "lng": 105.0500,
                "description": "Lá phổi xanh nguyên sinh với thảm bèo phủ xanh mướt và trung tâm hành hương tâm linh linh thiêng bậc nhất Nam Bộ.",
                "highlightTag": "Sinh thái mùa nước nổi",
                "subLocations": [
                    "Rừng tràm Trà Sư (Thảm bèo xanh mướt)",
                    "Miếu Bà Chúa Xứ Núi Sam linh thiêng",
                    "Cây cầu tre vạn bước xuyên rừng",
                    "Chợ Châu Đốc (Vương quốc mắm cá miền Tây)"
                ],
                "activities": [
                    "Đi tắc ráng và xuồng chèo len lỏi qua thảm bèo xanh rừng Tràm rợp bóng chim trời",
                    "Hành hương viếng Miếu Bà Chúa Xứ cầu may mắn, sức khỏe và tài lộc",
                    "Đi dạo trên cầu tre dài nhất Việt Nam xuyên qua rừng tràm nguyên sinh",
                    "Khám phá chợ mắm Châu Đốc nếm thử hàng trăm loại mắm cá linh, cá sặc trứ danh",
                    "Thưởng thức bánh bò thốt nốt ngọt béo và bún cá Châu Đốc thơm lừng"
                ],
                "foodSpecialties": ["Bún cá Châu Đốc", "Bánh bò thốt nốt nướng", "Gỏi sầu đâu khô cá sặc", "Mắm cá linh, cá lóc Châu Đốc"]
            }
        ]
    },
    {
        "id": "tuyenquang",
        "name": "Tỉnh Tuyên Quang",
        "province": "Tuyên Quang & Hà Giang",
        "provinceType": "province",
        "mergedFrom": "Hợp nhất tỉnh Tuyên Quang và Hà Giang",
        "region": "North",
        "regionName": "Miền Bắc",
        "lat": 21.8236,
        "lng": 105.2144,
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "description": "Vùng phên dậu Tổ quốc kết hợp hồ sinh thái Na Hang huyền ảo với Cao nguyên đá Đồng Văn hùng vĩ và đèo Mã Pí Lèng hiểm trở bậc nhất Việt Nam.",
        "tags": ["Mã Pí Lèng", "Đồng Văn", "Cột cờ Lũng Cú", "Hồ Na Hang", "Tam giác mạch"],
        "bestSeason": "Tháng 10 - 12 (Mùa hoa tam giác mạch) & Tháng 1 - 2 (Hoa đào, hoa mận)",
        "touristSpots": [
            {
                "id": "spot_tq_1",
                "name": "Cao nguyên đá Đồng Văn & Đèo Mã Pí Lèng (Hà Giang)",
                "category": "Kỳ quan thiên nhiên",
                "icon": "🏍️",
                "lat": 23.2833,
                "lng": 105.3667,
                "description": "Công viên địa chất toàn cầu UNESCO sở hữu một trong tứ đại đỉnh đèo hiểm trở bậc nhất và hẻm vực Tu Sản sâu nhất Đông Nam Á.",
                "highlightTag": "Đỉnh cao phượt thủ",
                "subLocations": [
                    "Đèo Mã Pí Lèng (Vua của các con đèo)",
                    "Hẻm Tu Sản & Dòng sông Nho Quế xanh ngọc",
                    "Cột cờ Quốc gia Lũng Cú (Cực Bắc)",
                    "Dinh thự Vua Mèo (Vương Chính Đức)",
                    "Phố cổ Đồng Văn đêm rực rỡ"
                ],
                "activities": [
                    "Đi thuyền máy xuôi dòng sông Nho Quế ngắm hẻm Tu Sản sừng sững nghìn mét",
                    "Chinh phục Đèo Mã Pí Lèng ngắm con đường Hạnh Phúc uốn lượn ven vách đá",
                    "Chạm tay vào lá cờ đỏ sao vàng 54m2 trên đỉnh Cột cờ Lũng Cú thiêng liêng",
                    "Thưởng thức Thắng cố ngựa và bánh Tam giác mạch nướng than nóng hổi",
                    "Nhâm nhi cà phê phố cổ Đồng Văn trong làn sương đêm se lạnh"
                ],
                "foodSpecialties": ["Bánh tam giác mạch nướng", "Thắng dền Đồng Văn", "Thịt lợn đen gác bếp", "Cháo ấu tẩu"]
            },
            {
                "id": "spot_tq_2",
                "name": "Khu sinh thái Hồ Na Hang - Lâm Bình",
                "category": "Sinh thái & Sông nước",
                "icon": "🛶",
                "lat": 22.3500,
                "lng": 105.3833,
                "description": "Vùng hồ thủy điện rộng lớn được ví như 'Hạ Long giữa cọc trời đại ngàn' với 99 ngọn núi trùng điệp soi bóng nước biếc.",
                "highlightTag": "Hạ Long giữa cọc trời",
                "subLocations": [
                    "Cọc Vài Phạ (Cọc buộc trâu trời)",
                    "Thác Khuổi Nhi (Thác massage cá tự nhiên)",
                    "Khu di tích lịch sử Tân Trào (Thủ đô kháng chiến)",
                    "Bản văn hóa Tày Lâm Bình"
                ],
                "activities": [
                    "Đi thuyền du ngoạn lòng hồ Na Hang chiêm ngưỡng hòn Cọc Vài kỳ vĩ",
                    "Leo thác Khuổi Nhi ngâm chân dưới dòng nước mát lạnh cho đàn cá massage tự nhiên",
                    "Thăm Lán Nà Nưa và Cây đa Tân Trào cội nguồn lịch sử dân tộc",
                    "Thưởng thức cá lăng nướng than và xôi ngũ sắc của đồng bào Tày"
                ],
                "foodSpecialties": ["Cá lăng Na Hang nướng", "Thịt trâu khô Tuyên Quang", "Gỏi cá bỗng sông Lô", "Bánh gai Chiêm Hóa"]
            }
        ]
    },
    {
        "id": "thainguyen",
        "name": "Tỉnh Thái Nguyên",
        "province": "Thái Nguyên & Bắc Kạn",
        "provinceType": "province",
        "mergedFrom": "Hợp nhất tỉnh Thái Nguyên và Bắc Kạn",
        "region": "North",
        "regionName": "Miền Bắc",
        "lat": 21.5928,
        "lng": 105.8442,
        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        "description": "Thủ phủ chè nức tiếng 'Đệ nhất danh trà' Tân Cương kết hợp cùng Hồ Ba Bể một trong 20 hồ nước ngọt tự nhiên lớn nhất thế giới.",
        "tags": ["Hồ Ba Bể", "Đồi chè Tân Cương", "Hồ Núi Cốc", "Trà xanh Thái Nguyên"],
        "bestSeason": "Tháng 4 - 10 (Hồ nước trong xanh, đồi chè mơn mởn)",
        "touristSpots": [
            {
                "id": "spot_tn_1",
                "name": "Vườn quốc gia & Hồ Ba Bể (Bắc Kạn)",
                "category": "Kỳ quan sinh thái",
                "icon": "🛶",
                "lat": 22.4167,
                "lng": 105.6167,
                "description": "Viên ngọc bích giữa lòng núi đá vôi Đông Bắc, bao quanh bởi rừng nguyên sinh cổ thụ và các bản làng người Tày mến khách.",
                "highlightTag": "Vườn di sản ASEAN",
                "subLocations": [
                    "Hồ Ba Bể (Pé Lầm, Pé Lù, Pé Lèng)",
                    "Động Puông dòng sông ngầm chảy qua",
                    "Thác Đầu Đẳng hùng vĩ",
                    "Bản Pác Ngòi nhà sàn ven hồ",
                    "Đảo Bà Góa huyền thoại"
                ],
                "activities": [
                    "Đi thuyền độc mộc hoặc thuyền máy lướt nhẹ trên mặt nước hồ Ba Bể phẳng lặng như gương",
                    "Khám phá Động Puông thạch nhũ kỳ bí nơi cư ngụ của hàng ngàn con dơi",
                    "Nghỉ đêm tại homestay nhà sàn truyền thống Bản Pác Ngòi ngắm sao đêm",
                    "Thưởng thức cá hồ Ba Bể nướng than hoa kẹp kẹp tre và tép chua Ba Bể"
                ],
                "foodSpecialties": ["Cá mương nướng kẹp tre", "Tép chua Ba Bể", "Lợn sữa quay mắc mật", "Miến dong Na Rì"]
            },
            {
                "id": "spot_tn_2",
                "name": "Vùng đồi chè đặc sản Tân Cương & Hồ Núi Cốc",
                "category": "Nông nghiệp & Nghỉ dưỡng",
                "icon": "🍵",
                "lat": 21.5500,
                "lng": 105.7500,
                "description": "Những đồi chè bát úp xanh ngắt ngút ngàn tầm mắt, cội nguồn của loại trà Đinh quý hiếm đệ nhất thiên hạ.",
                "highlightTag": "Đệ nhất danh trà Việt Nam",
                "subLocations": [
                    "Không gian văn hóa Trà Tân Cương",
                    "Đồi chè Cầu Đá bát úp xanh mướt",
                    "Khu du lịch Hồ Núi Cốc huyền thoại chàng Cốc nàng Công",
                    "Khu di tích lịch sử ATK Định Hóa"
                ],
                "activities": [
                    "Hóa thân thành cô thôn nữ hái búp chè một tôm hai lá vào buổi sớm mai",
                    "Trải nghiệm tự tay sao chè thủ công và thưởng thức trà Đinh Tân Cương tiền chát hậu ngọt",
                    "Đi du thuyền trên Hồ Núi Cốc khám phá động Huyền Thoại Cung",
                    "Thăm ATK Định Hóa an toàn khu trung tâm đầu não kháng chiến"
                ],
                "foodSpecialties": ["Trà Đinh Tân Cương thượng hạng", "Cơm lam Định Hóa", "Bánh chưng Bờ Đậu", "Nem chua Đại Từ"]
            }
        ]
    },
    {
        "id": "phutho",
        "name": "Tỉnh Phú Thọ",
        "province": "Phú Thọ, Vĩnh Phúc & Hòa Bình",
        "provinceType": "province",
        "mergedFrom": "Hợp nhất Phú Thọ, Vĩnh Phúc và Hòa Bình",
        "region": "North",
        "regionName": "Miền Bắc",
        "lat": 21.3167,
        "lng": 105.2167,
        "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        "description": "Vùng đất cội nguồn dân tộc với Đền Hùng linh thiêng, thị trấn mờ sương Tam Đảo bốn mùa trong ngày và thung lũng Mai Châu thơ mộng.",
        "tags": ["Đền Hùng", "Tam Đảo", "Mai Châu", "Hát Xoan", "Thịt chua Thanh Sơn"],
        "bestSeason": "Tháng 3 Âm lịch (Giỗ Tổ Hùng Vương) & Tháng 9 - 11",
        "touristSpots": [
            {
                "id": "spot_pt_1",
                "name": "Khu Di tích Lịch sử Đền Hùng",
                "category": "Di tích cội nguồn",
                "icon": "🏛️",
                "lat": 21.3650,
                "lng": 105.3280,
                "description": "Nơi thờ phụng các vua Hùng có công dựng nước, cội nguồn tâm linh thiêng liêng nhất trong tâm thức muôn triệu người con đất Việt.",
                "highlightTag": "Cội nguồn dân tộc Việt Nam",
                "subLocations": [
                    "Đền Hạ, Đền Trung, Đền Thượng núi Nghĩa Lĩnh",
                    "Lăng Vua Hùng thứ 6",
                    "Đền Giếng (Nơi công chúa Tiên Dung, Ngọc Hoa soi gương)",
                    "Bảo tàng Hùng Vương",
                    "Làng cổ Hát Xoan Kim Đức"
                ],
                "activities": [
                    "Hành hương leo gần 500 bậc đá lên Đền Thượng dâng hương tưởng nhớ các Vua Hùng",
                    "Lắng nghe điệu Hát Xoan Phú Thọ di sản văn hóa phi vật thể đại diện của nhân loại",
                    "Thăm Bảo tàng Hùng Vương chiêm ngưỡng Trống đồng Đông Sơn và bảo vật quốc gia",
                    "Thưởng thức Bánh chưng, bánh giầy dâng vua và thịt chua Thanh Sơn bùi thơm"
                ],
                "foodSpecialties": ["Thịt chua Thanh Sơn", "Bánh tai Phú Thọ", "Cá anh vũ tiến vua", "Búp khoai kho tương"]
            },
            {
                "id": "spot_pt_2",
                "name": "Khu nghỉ dưỡng Tam Đảo (Vĩnh Phúc)",
                "category": "Nghỉ dưỡng & Sương mù",
                "icon": "🏰",
                "lat": 21.4580,
                "lng": 105.6470,
                "description": "Đà Lạt của miền Bắc ẩn mình trên độ cao 900m với các tòa lâu đài phong cách châu Âu và sương mù bồng bềnh bốn mùa se lạnh.",
                "highlightTag": "Thị trấn bồng bềnh mây trắng",
                "subLocations": [
                    "Quảng trường Tam Đảo & Nhà thờ Đá cổ",
                    "Cầu Mây & Lâu đài Tam Đảo nguy nga",
                    "Thác Bạc dòng nước trắng xóa",
                    "Tháp truyền hình Tam Đảo đỉnh núi",
                    "Quần thể Tây Thiên di tích danh thắng"
                ],
                "activities": [
                    "Check-in Nhà thờ Đá cổ kính phong cách Gothic ngắm toàn cảnh thị trấn mây mù",
                    "Săn hoàng hôn và mây trôi bồng bềnh tại Cầu Mây lãng mạn",
                    "Thưởng thức ngọn Su su xào tỏi giòn ngọt đặc sản đỉnh núi",
                    "Ăn đồ nướng xiên que thơm phức và gà đồi bọc đất nướng than"
                ],
                "foodSpecialties": ["Ngọn su su xào tỏi", "Gà đồi Tam Đảo nướng bọc giấy bạc", "Thịt lợn mán nướng", "Rượu ngô Tây Thiên"]
            },
            {
                "id": "spot_pt_3",
                "name": "Thung lũng Mai Châu (Hòa Bình)",
                "category": "Văn hóa & Sinh thái",
                "icon": "🏡",
                "lat": 20.6667,
                "lng": 105.0833,
                "description": "Thung lũng thơ mộng bình yên của đồng bào người Thái với những nếp nhà sàn xinh xắn giữa biển lúa xanh ngắt ngút ngàn.",
                "highlightTag": "Bản làng yên bình Tây Bắc",
                "subLocations": [
                    "Bản Lác & Bản Pom Coọng",
                    "Đèo Thung Khe (Đèo Đá Trắng phủ sương tuyết)",
                    "Hang Kia - Pà Cò săn mây",
                    "Hang Chiều 1.200 bậc đá"
                ],
                "activities": [
                    "Đạp xe thong dong quanh bản Lác ngắm cánh đồng lúa và nhà sàn mộc mạc",
                    "Dừng chân trên đỉnh Đèo Thung Khe ngắm thung lũng đá trắng mờ sương và ăn ngô nướng",
                    "Thưởng thức múa xòe Thái, nhảy sạp và uống rượu cần ngây ngất men say",
                    "Ăn cơm lam nướng ống nứa, cá suối nướng Pa Pỉnh Tộp đậm đà gia vị rừng"
                ],
                "foodSpecialties": ["Cơm lam nếp nương Mai Châu", "Cá suối nướng Pa Pỉnh Tộp", "Thịt lợn cắp nách nướng hạt dổi", "Rượu cần Mường"]
            }
        ]
    },
    {
        "id": "bacninh",
        "name": "Tỉnh Bắc Ninh",
        "province": "Bắc Ninh & Bắc Giang",
        "provinceType": "province",
        "mergedFrom": "Hợp nhất tỉnh Bắc Ninh và Bắc Giang",
        "region": "North",
        "regionName": "Miền Bắc",
        "lat": 21.1833,
        "lng": 106.0500,
        "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
        "description": "Vùng đất Kinh Bắc ngàn năm văn vật, cội nguồn Dân ca Quan họ được UNESCO tôn vinh, kết hợp cùng dải di tích Tây Yên Tử linh thiêng.",
        "tags": ["Quan họ Bắc Ninh", "Chùa Dâu", "Chùa Bút Tháp", "Tây Yên Tử", "Bánh phu thê"],
        "bestSeason": "Tháng 1 - 3 (Mùa lễ hội Quan họ & Hội Lim) & Mùa hè",
        "touristSpots": [
            {
                "id": "spot_bn_1",
                "name": "Cái nôi Quan Họ & Các ngôi Chùa Cổ Kinh Bắc",
                "category": "Di sản & Tâm linh",
                "icon": "🪕",
                "lat": 21.1500,
                "lng": 106.0600,
                "description": "Không gian văn hóa Quan họ mượt mà đằm thắm với những ngôi chùa cổ kính bậc nhất Việt Nam lưu giữ bảo vật quốc gia.",
                "highlightTag": "Di sản văn hóa phi vật thể UNESCO",
                "subLocations": [
                    "Chùa Dâu (Ngôi chùa cổ nhất Việt Nam thế kỷ II)",
                    "Chùa Bút Tháp (Tượng Phật Bà Quan Âm nghìn mắt nghìn tay)",
                    "Đền Đô (Nơi thờ 8 vị vua triều Lý)",
                    "Làng tranh dân gian Đông Hồ",
                    "Đồi Lim (Hội Lim hát canh Quan họ)"
                ],
                "activities": [
                    "Thưởng thức canh hát Quan họ trên thuyền rồng tại Hội Lim nghe câu hát 'Người ơi người ở đừng về'",
                    "Đi chùa Dâu chiêm bái tháp Hòa Phong cổ kính và tìm hiểu cội nguồn Phật giáo Việt Nam",
                    "Chiêm ngưỡng pho tượng Phật Bà Quan Âm thiên thủ thiên nhãn kiệt tác gỗ tại Chùa Bút Tháp",
                    "Tự tay in tranh dân gian Đông Hồ trên giấy điệp truyền thống",
                    "Thưởng thức Bánh phu thê Đình Bảng dẻo thơm nhân đậu xanh dừa sợi"
                ],
                "foodSpecialties": ["Bánh phu thê Đình Bảng", "Nem bùi Ninh Xá", "Bánh tẻ làng Chờ", "Gà Hồ Thuận Thành tiến vua"]
            },
            {
                "id": "spot_bn_2",
                "name": "Khu Di tích Tâm linh Tây Yên Tử (Bắc Giang)",
                "category": "Tâm linh & Cảnh quan",
                "icon": "⛰️",
                "lat": 21.2167,
                "lng": 106.7500,
                "description": "Con đường hoằng dương phật pháp của Phật hoàng Trần Nhân Tông với hệ thống cáp treo xuyên rừng nguyên sinh Khe Rỗ.",
                "highlightTag": "Con đường Phật hoàng",
                "subLocations": [
                    "Quần thể Tây Yên Tử (Chùa Hạ, Chùa Thượng)",
                    "Rừng nguyên sinh Khe Rỗ phong phú sinh học",
                    "Chùa Vĩnh Nghiêm (Nơi lưu giữ mộc bản di sản ký ức thế giới)",
                    "Vùng đồi vải thiều Lục Ngạn bạt ngàn"
                ],
                "activities": [
                    "Đi cáp treo Tây Yên Tử ngắm rừng nguyên sinh bạt ngàn và biển mây chập chùng",
                    "Thăm Chùa Vĩnh Nghiêm chiêm bái kho mộc bản kinh Phật độc nhất vô nhị",
                    "Trekking tắm suối trong lành tại khu bảo tồn thiên nhiên Khe Rỗ",
                    "Thưởng thức Vải thiều Lục Ngạn mọng nước ngọt lịm vào tháng 6 mùa thu hoạch"
                ],
                "foodSpecialties": ["Vải thiều Lục Ngạn", "Bánh đa Kế", "Mì Chũ Lục Ngạn", "Rượu làng Vân"]
            }
        ]
    },
    {
        "id": "hungyen",
        "name": "Tỉnh Hưng Yên",
        "province": "Hưng Yên & Thái Bình",
        "provinceType": "province",
        "mergedFrom": "Hợp nhất tỉnh Hưng Yên và Thái Bình",
        "region": "North",
        "regionName": "Miền Bắc",
        "lat": 20.6500,
        "lng": 106.0500,
        "image": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
        "description": "Vùng châu thổ trù phú lưu danh 'Thứ nhất Kinh Kỳ, thứ nhì Phố Hiến' cùng Chùa Keo cổ kính kiệt tác kiến trúc gỗ độc nhất miền Bắc.",
        "tags": ["Phố Hiến", "Chùa Keo", "Đền Trần", "Nhãn lồng Hưng Yên", "Bánh cáy"],
        "bestSeason": "Tháng 7 - 8 (Mùa nhãn lồng chín rộ) & Mùa xuân lễ hội",
        "touristSpots": [
            {
                "id": "spot_hy_1",
                "name": "Quần thể Di tích Phố Hiến cổ danh tiếng",
                "category": "Di tích lịch sử",
                "icon": "🏯",
                "lat": 20.6500,
                "lng": 106.0500,
                "description": "Thương cảng sầm uất lừng lẫy thế kỷ XVII nơi hội tụ thương nhân quốc tế với những ngôi đền, chùa cổ kính soi bóng Hồ Bán Nguyệt.",
                "highlightTag": "Đệ nhị đô hội cổ truyền",
                "subLocations": [
                    "Hồ Bán Nguyệt thơ mộng",
                    "Đền Mẫu linh thiêng bên cây đa cổ thụ trăm tuổi",
                    "Chùa Chuông (Phố Hiến đệ nhất danh lam)",
                    "Văn Miếu Xích Đằng cổ kính",
                    "Đền Chử Đồng Tử - Tiên Dung (Dạ Trạch)"
                ],
                "activities": [
                    "Đi dạo ven Hồ Bán Nguyệt ngắm bóng tháp cổ trầm mặc lúc hoàng hôn",
                    "Đi đền Mẫu dâng hương cầu tài lộc dưới tán cây đa - si - sanh ba gốc độc đáo",
                    "Chiêm ngưỡng hệ thống tượng Phật cổ và chuông đồng tại Chùa Chuông",
                    "Thưởng thức Nhãn lồng Hưng Yên cùi dày giòn ngọt lịm và chè sen long nhãn",
                    "Ăn bún thang lươn Phố Hiến hương vị đậm đà khó quên"
                ],
                "foodSpecialties": ["Nhãn lồng Hưng Yên", "Chè hạt sen long nhãn", "Bún thang lươn Phố Hiến", "Gà Đông Tảo chân khủng"]
            },
            {
                "id": "spot_hy_2",
                "name": "Quần thể Chùa Keo & Đền Trần (Thái Bình)",
                "category": "Kiến trúc & Lịch sử",
                "icon": "🛕",
                "lat": 20.4000,
                "lng": 106.3000,
                "description": "Ngôi chùa cổ gần 400 năm tuổi với Gác Chuông bằng gỗ lim ba tầng 12 mái kiệt tác kiến trúc đỉnh cao của nghệ thuật điêu khắc gỗ Việt Nam.",
                "highlightTag": "Kiệt tác kiến trúc gỗ lim",
                "subLocations": [
                    "Gác Chuông Chùa Keo ba tầng bằng gỗ",
                    "Đền Trần Thái Bình (Nơi phát tích vương triều Trần)",
                    "Khu du lịch sinh thái Biển Đồng Châu",
                    "Làng nghề chạm bạc Đồng Xâm"
                ],
                "activities": [
                    "Chiêm ngưỡng kiến trúc không dùng một chiếc đinh sắt của Gác Chuông Chùa Keo",
                    "Dâng hương tưởng nhớ các vị vua triều Trần tại Đền Trần đất phát tích",
                    "Ngắm cảnh đồng ngao bãi cọc độc đáo tại bãi biển Đồng Châu lúc bình minh",
                    "Thưởng thức Bánh cáy làng Nguyễn dẻo cay thơm mùi gừng và canh cá Quỳnh Côi"
                ],
                "foodSpecialties": ["Bánh cáy Làng Nguyễn", "Canh cá Quỳnh Côi", "Ổi Bo Thái Bình", "Nộm sứa Thái Thụy"]
            }
        ]
    }
]

print(f"Total base destinations compiled: {len(DESTINATIONS_DATA)}")

