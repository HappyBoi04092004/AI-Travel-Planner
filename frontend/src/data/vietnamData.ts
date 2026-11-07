import { VietnamDestination, LocalSpecialty, CulturalHighlight, AttractionItem } from '@/types/wizard';

// 34 TỈNH VÀ THÀNH PHỐ TRỰC THUỘC TRUNG ƯƠNG VIỆT NAM (Sau đề án sắp xếp, tinh gọn)
export const VIETNAM_DESTINATIONS: VietnamDestination[] = [
  // ==========================================
  // 06 THÀNH PHỐ TRỰC THUỘC TRUNG ƯƠNG
  // ==========================================
  {
    id: 'hanoi',
    name: 'TP. Hà Nội',
    province: 'Thủ đô Hà Nội',
    provinceType: 'city',
    mergedFrom: 'Giữ nguyên trạng thái Thủ đô',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 21.0285,
    lng: 105.8542,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    description: 'Thủ đô ngàn năm văn hiến, trung tâm chính trị, văn hóa và ẩm thực tinh hoa của cả nước với 36 phố phường rêu phong.',
    tags: ['Thủ đô di sản', 'Ẩm thực phố cổ', 'Hồ Gươm', 'Văn hóa Tràng An'],
    bestSeason: 'Tháng 9 - 11 (Mùa thu vàng) & Tháng 2 - 4 (Xuân)',
    touristSpots: [
      {
        id: "spot_hn_1",
        name: "Quần thể Hồ Gươm & 36 Phố Phường",
        category: "Di sản & Ẩm thực",
        icon: "🏯",
        lat: 21.0287,
        lng: 105.8524,
        description: "Trái tim của Thủ đô với cầu Thê Húc đỏ son, tháp Rùa cổ kính và mê cung phố nghề ẩm thực truyền thống.",
        highlightTag: "Biểu tượng Thủ đô",
        subLocations: [
      "Hồ Hoàn Kiếm & Đền Ngọc Sơn",
      "Phố đi bộ & Chợ đêm Hàng Đào",
      "Nhà thờ Lớn Hà Nội (Kiến trúc Gothic)",
      "Ô Quan Chưởng & Chợ Đồng Xuân",
      "Phố ẩm thực Tạ Hiện & Hàng Buồm"
],
        activities: [
      "Đi dạo ven Hồ Gươm ngắm Tháp Rùa & cầu Thê Húc cầu may mắn",
      "Thưởng thức Cà phê trứng Giảng & Phở Bát Đàn truyền thống",
      "Đi xích lô dạo quanh 36 phố phường cổ kính",
      "Uống bia hơi và ăn nem chua rán trên phố Tạ Hiện về đêm",
      "Check-in sống ảo tại Nhà thờ Lớn và phố bích họa Phùng Hưng"
],
        foodSpecialties: [
      "Phở bò Bát Đàn",
      "Bún chả Hàng Mành",
      "Chả cá Lã Vọng",
      "Cà phê trứng Giảng",
      "Bánh cuốn Thanh Trì"
]
      },
      {
        id: "spot_hn_2",
        name: "Quần thể Ba Đình - Tây Hồ & Văn Miếu",
        category: "Lịch sử & Thư giãn",
        icon: "🏛️",
        lat: 21.0293,
        lng: 105.8361,
        description: "Trung tâm văn hiến ngàn năm với trường đại học đầu tiên của Việt Nam và không gian lộng gió Hồ Tây.",
        highlightTag: "Di tích quốc gia đặc biệt",
        subLocations: [
      "Quảng trường Ba Đình & Lăng Chủ tịch",
      "Chùa Trấn Quốc (Ngôi chùa cổ nhất Hà Nội)",
      "Văn Miếu - Quốc Tử Giám",
      "Hồ Tây & Bến Hàn Quốc",
      "Hoàng thành Thăng Long di sản UNESCO"
],
        activities: [
      "Viếng Lăng Bác và tham quan Nhà sàn ao cá Bác Hồ",
      "Chèo SUP hoặc đạp vịt đón hoàng hôn trên Hồ Tây",
      "Đi chùa Trấn Quốc thắp hương cầu bình an đầu năm",
      "Thăm 82 bia Tiến sĩ và xin chữ may mắn tại Văn Miếu",
      "Thưởng thức bánh tôm giòn rụm và kem Tràng Tiền bên hồ"
],
        foodSpecialties: [
      "Bánh tôm Hồ Tây",
      "Bún ốc nguội Tây Hồ",
      "Cốm xanh Làng Vòng",
      "Trà sen Tây Hồ"
]
      },
      {
        id: "spot_hn_3",
        name: "Quần thể Di tích Chùa Hương (Mỹ Đức)",
        category: "Tâm linh & Cảnh quan",
        icon: "🛕",
        lat: 20.6186,
        lng: 105.7533,
        description: "Nam thiên đệ nhất động với dòng suối Yến thơ mộng và các ngôi chùa cổ tựa vào vách núi đá vôi.",
        highlightTag: "Lễ hội tâm linh lớn nhất",
        subLocations: [
      "Suối Yến mùa hoa súng nở",
      "Chùa Thiên Trù (Bếp Trời)",
      "Động Hương Tích (Nam thiên đệ nhất động)",
      "Đền Trình & Chùa Giải Oan"
],
        activities: [
      "Đi thuyền nan xuôi dòng Suối Yến ngắm cảnh non xanh nước biếc",
      "Đi cáp treo hoặc leo bậc đá vào Động Hương Tích chiêm bái",
      "Đi chùa thắp hương cầu tự và bình an cho gia đạo",
      "Thưởng thức rau sắng rừng và dê núi Mỹ Đức"
],
        foodSpecialties: [
      "Rau sắng Chùa Hương",
      "Chè củ mài",
      "Mơ Hương Tích",
      "Thịt dê núi Mỹ Đức"
]
      }
    ]
  },
  {
    id: 'hcm',
    name: 'TP. Hồ Chí Minh',
    province: 'TP. Hồ Chí Minh (mở rộng)',
    provinceType: 'city',
    mergedFrom: 'Hợp nhất TP.HCM, Bình Dương và Bà Rịa - Vũng Tàu',
    region: 'South',
    regionName: 'Miền Nam',
    lat: 10.8231,
    lng: 106.6297,
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    description: 'Đại đô thị kinh tế - du lịch năng động bậc nhất, kết nối đô thị hiện đại với thành phố biển Vũng Tàu và trung tâm công nghệ Bình Dương.',
    tags: ['Đô thị sôi động', 'Biển Vũng Tàu', 'Bến Thành', 'Kinh tế số'],
    bestSeason: 'Tháng 12 - 4 (Mùa khô nắng ấm)',
    touristSpots: [
      {
        id: "spot_hcm_1",
        name: "Trung tâm Bến Nghé & Bến Bạch Đằng",
        category: "Đô thị & Check-in",
        icon: "🏙️",
        lat: 10.7725,
        lng: 106.698,
        description: "Trái tim hiện đại của Sài Gòn với các công trình kiến trúc Pháp cổ xen lẫn tòa tháp chọc trời lung linh ánh đèn.",
        highlightTag: "Top Check-in Đêm",
        subLocations: [
      "Phố đi bộ Nguyễn Huệ",
      "Chợ Bến Thành lịch sử",
      "Bến Bạch Đằng & WaterBus sông Sài Gòn",
      "Bưu điện Trung tâm & Nhà thờ Đức Bà",
      "Tòa tháp Landmark 81 đài quan sát"
],
        activities: [
      "Đi bus đường sông WaterBus ngắm hoàng hôn rực rỡ trên sông Sài Gòn",
      "Thưởng thức Cơm tấm sườn bì chả & Hủ tiếu Nam Vang trứ danh",
      "Dạo phố đi bộ đêm thưởng thức biểu diễn âm nhạc đường phố",
      "Lên đài quan sát tầng 81 ngắm trọn vẹn thành phố từ trên cao",
      "Uống cà phê bệt ngắm Bưu điện cổ kính phong cách châu Âu"
],
        foodSpecialties: [
      "Cơm tấm sườn bì chả Ba Ghiền",
      "Bánh mì Huỳnh Hoa",
      "Hủ tiếu Nam Vang",
      "Phá lấu bò"
]
      },
      {
        id: "spot_hcm_2",
        name: "Thành phố Biển Vũng Tàu",
        category: "Nghỉ dưỡng biển",
        icon: "🏖️",
        lat: 10.334,
        lng: 107.086,
        description: "Bờ biển xanh lộng gió với ngọn hải đăng trăm năm tuổi và các món hải sản thơm ngon quyến rũ.",
        highlightTag: "Biển đảo nghỉ dưỡng",
        subLocations: [
      "Bãi Sau (Bãi Thùy Vân) tắm biển",
      "Ngọn Hải Đăng cổ Vũng Tàu",
      "Tượng Chúa Kito Vua (Núi Nhỏ)",
      "Mũi Nghinh Phong đón gió",
      "Hòn Bà con đường rẽ biển"
],
        activities: [
      "Tắm biển Bãi Sau và tham gia mô tô nước, dù lượn bãi biển",
      "Ăn bánh khọt Cô Ba Vũng Tàu giòn rụm & lẩu cá đuối măng chua",
      "Leo bậc thang lên cánh tay Tượng Chúa ngắm toàn cảnh biển",
      "Check-in ngọn hải đăng cổ kính và ăn trứng gà lòng đào",
      "Đi bộ qua con đường đá giữa biển sang viếng Miếu Hòn Bà"
],
        foodSpecialties: [
      "Bánh khọt Vũng Tàu",
      "Lẩu cá đuối măng chua",
      "Bông lan trứng muối Gốc Cột Điện",
      "Gỏi cá mai"
]
      },
      {
        id: "spot_hcm_3",
        name: "Chợ Lớn (Quận 5) & Khu ẩm thực Hoa",
        category: "Văn hóa & Ẩm thực",
        icon: "🏮",
        lat: 10.7538,
        lng: 106.6578,
        description: "Không gian di sản văn hóa độc đáo của cộng đồng người Hoa với hội quán cổ kính và thiên đường ẩm thực.",
        highlightTag: "Phố cổ Sài Gòn",
        subLocations: [
      "Chùa Bà Thiên Hậu nghìn năm",
      "Chợ Bình Tây (Chợ Lớn)",
      "Phố lồng đèn Lương Nhữ Học",
      "Hội quán Nghĩa An & Ôn Lăng"
],
        activities: [
      "Đi chùa Bà Thiên Hậu thắp hương vòng cầu bình an và may mắn",
      "Thưởng thức Dimsum nóng hổi, sủi cảo và mì kéo sợi truyền thống",
      "Chụp ảnh check-in phong cách hoài cổ Hong Kong tại các hội quán",
      "Thưởng thức chè người Hoa 20 vị thanh mát tốt cho sức khỏe"
],
        foodSpecialties: [
      "Dimsum & Vịt quay",
      "Sủi cảo Hà Tôn Quyền",
      "Mì vịt tiềm",
      "Chè người Hoa"
]
      }
    ]
  },
  {
    id: 'danang',
    name: 'TP. Đà Nẵng',
    province: 'TP. Đà Nẵng (mở rộng)',
    provinceType: 'city',
    mergedFrom: 'Hợp nhất TP. Đà Nẵng và tỉnh Quảng Nam',
    region: 'Central',
    regionName: 'Miền Trung',
    lat: 16.0544,
    lng: 108.2022,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    description: 'Thành phố biển đáng sống sở hữu bộ đôi kỳ quan: Cầu Vàng Bà Nà Hills và Đô thị cổ Hội An lung linh đèn lồng.',
    tags: ['Cầu Vàng', 'Phố cổ Hội An', 'Biển Mỹ Khê', 'Di sản UNESCO'],
    bestSeason: 'Tháng 2 - 8 (Biển êm, nắng vàng)',
    touristSpots: [
      {
        id: "spot_dn_1",
        name: "Quần thể Bà Nà Hills & Cầu Vàng",
        category: "Kỳ quan & Giải trí",
        icon: "🌉",
        lat: 15.9989,
        lng: 107.988,
        description: "Cây cầu tựa đôi bàn tay Phật khổng lồ giữa mây ngàn và quần thể làng Pháp cổ kính bốn mùa se lạnh.",
        highlightTag: "Kỳ quan thế giới",
        subLocations: [
      "Cầu Vàng (Bàn tay Phật khổng lồ)",
      "Làng Pháp & Quảng trường Nhật Thực",
      "Công viên giải trí Fantasy Park trong nhà",
      "Hầm rượu Debay trăm tuổi & Vườn hoa Le Jardin",
      "Chùa Linh Ứng Bà Nà"
],
        activities: [
      "Đi cáp treo đạt nhiều kỷ lục thế giới băng qua biển mây đại ngàn",
      "Check-in Cầu Vàng lúc bình minh khi sương sớm còn vờn qua tay Phật",
      "Trải nghiệm 4 mùa trong một ngày tại không gian lâu đài châu Âu",
      "Thưởng thức buffet Á - Âu đỉnh núi và bia tươi thủ công Bà Nà",
      "Khám phá hầm rượu vang cổ nằm sâu trong lòng núi đá"
],
        foodSpecialties: [
      "Buffet đỉnh Bà Nà",
      "Xúc xích Đức nướng than",
      "Bia thủ công Bà Nà"
]
      },
      {
        id: "spot_dn_2",
        name: "Đô thị cổ Hội An (Quảng Nam)",
        category: "Di sản UNESCO",
        icon: "🏮",
        lat: 15.8801,
        lng: 108.338,
        description: "Di sản thế giới rực rỡ sắc màu hoa đăng bên dòng sông Hoài thơ mộng, nhà cổ mái ngói rêu phong và đèn lồng huyền ảo.",
        highlightTag: "Top di sản lãng mạn",
        subLocations: [
      "Chùa Cầu Nhật Bản biểu tượng",
      "Bến thuyền sông Hoài",
      "Nhà cổ Tấn Ký & Phùng Hưng",
      "Rừng dừa Bảy Mẫu Cẩm Thanh",
      "Làng gốm Thanh Hà"
],
        activities: [
      "Đi thuyền nan thả hoa đăng ước nguyện lung linh trên dòng sông Hoài",
      "Thưởng thức Cao Lầu, Mì Quảng ếch & Cơm gà Hội An thơm lừng",
      "Đi thuyền thúng xoay vòng cảm giác mạnh tại Rừng dừa Bảy Mẫu",
      "Thuê áo dài truyền thống dạo bước chụp ảnh dưới ngàn ngọn đèn lồng",
      "Thưởng thức nước thảo mộc Mót mát lành và bánh mì Phượng nổi tiếng"
],
        foodSpecialties: [
      "Cao lầu Hội An",
      "Mì Quảng ếch Bếp Trang",
      "Cơm gà Bà Buội",
      "Bánh mì Phượng",
      "Nước thảo mộc Mót"
]
      },
      {
        id: "spot_dn_3",
        name: "Bán đảo Sơn Trà & Bãi biển Mỹ Khê",
        category: "Biển & Thiên nhiên",
        icon: "🏖️",
        lat: 16.0601,
        lng: 108.2468,
        description: "Bãi biển quyến rũ hàng đầu hành tinh kết hợp cùng lá phổi xanh Sơn Trà với tượng Phật Bà 67m hướng biển Đông.",
        highlightTag: "Nghỉ dưỡng biển 5 sao",
        subLocations: [
      "Chùa Linh Ứng Sơn Trà (Tượng Phật Bà 67m)",
      "Bãi biển Mỹ Khê cát trắng mịn",
      "Đỉnh Bàn Cờ tiên cảnh",
      "Cầu Rồng phun lửa & sông Hàn",
      "Cây đa ngàn năm tuổi"
],
        activities: [
      "Tắm biển Mỹ Khê và trải nghiệm lướt sóng, dù lượn trên cao",
      "Viếng Chùa Linh Ứng cầu bình an và ngắm trọn vịnh Đà Nẵng",
      "Lên đỉnh Bàn Cờ săn mây và đánh cờ cùng tiên ông",
      "Xem Cầu Rồng phun lửa và nước vào mỗi tối cuối tuần",
      "Ăn hải sản tươi sống Năm Đảnh và bánh tráng cuốn thịt heo hai đầu da"
],
        foodSpecialties: [
      "Bánh tráng cuốn thịt heo hai đầu da",
      "Hải sản tươi Năm Đảnh",
      "Bún chả cá Đà Nẵng",
      "Chè sầu Liên"
]
      }
    ]
  },
  {
    id: 'haiphong',
    name: 'TP. Hải Phòng',
    province: 'TP. Hải Phòng (mở rộng)',
    provinceType: 'city',
    mergedFrom: 'Hợp nhất TP. Hải Phòng và tỉnh Hải Dương',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 20.8449,
    lng: 106.6881,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Thành phố Hoa phượng đỏ kết hợp vịnh biển đảo Cát Bà ngọc bích và vùng đất địa linh nhân kiệt Côn Sơn - Kiếp Bạc.',
    tags: ['Vịnh Lan Hạ', 'Đảo Cát Bà', 'Food Tour', 'Côn Sơn Kiếp Bạc'],
    bestSeason: 'Tháng 4 - 10',
    touristSpots: [
      {
        id: "spot_hp_1",
        name: "Quần đảo Cát Bà & Vịnh Lan Hạ",
        category: "Biển đảo & Sinh quyển",
        icon: "🏝️",
        lat: 20.7275,
        lng: 107.045,
        description: "Khu dự trữ sinh quyển thế giới với hàng trăm bãi tắm cát tự nhiên nép mình dưới chân các đảo đá vôi xanh biếc.",
        highlightTag: "Di sản thiên nhiên thế giới UNESCO",
        subLocations: [
      "Vịnh Lan Hạ (Chèo Kayak hang Sáng Tối)",
      "Vườn quốc gia Cát Bà (Trekking Đỉnh Ngự Lâm)",
      "Làng chài cổ Cái Bèo lâu đời nhất",
      "Bãi tắm Cát Cò 1, 2, 3"
],
        activities: [
      "Đi du thuyền tham quan Vịnh Lan Hạ và chèo Kayak luồn qua hang Sáng Tối",
      "Trekking xuyên rừng nguyên sinh Vườn quốc gia Cát Bà ngắm Voọc Cát Bà quý hiếm",
      "Thăm làng chài cổ Cái Bèo thưởng thức tu hài, cá song tươi sống trên bè",
      "Tắm biển tại bãi Cát Cò và đi bộ trên đường mòn vách đá ven biển ngắm hoàng hôn"
],
        foodSpecialties: [
      "Tu hài Cát Bà nướng mỡ hành",
      "Bề bề rang muối",
      "Cá song hấp xì dầu",
      "Mực một nắng"
]
      },
      {
        id: "spot_hp_2",
        name: "Thiên đường Food Tour Hải Phòng",
        category: "Ẩm thực đường phố",
        icon: "🍜",
        lat: 20.858,
        lng: 106.68,
        description: "Trải nghiệm ẩm thực đường phố sôi động nức tiếng giới trẻ với các món ăn mang đậm hương vị biển cả.",
        highlightTag: "Food Tour Hot nhất miền Bắc",
        subLocations: [
      "Chợ Lương Văn Can thiên đường ăn vặt",
      "Chợ Cát Bi (Chợ ăn vặt buổi chiều)",
      "Ga Hải Phòng kiến trúc Pháp",
      "Phố đi bộ Tam Bạc ven sông"
],
        activities: [
      "Thuê xe máy oanh tạc bản đồ Food Tour Hải Phòng thưởng thức hơn 20 món ngon",
      "Thưởng thức Bánh đa cua bể Bà Cụ nước dùng ngọt lịm từ gạch cua đồng",
      "Ăn bánh mì que Cay cay nồng chấm tương ớt Chí Chương gia truyền",
      "Thưởng thức cà phê cốt dừa cô Hạnh béo ngậy và chè dừa dầm mát lạnh"
],
        foodSpecialties: [
      "Bánh đa cua bể Hải Phòng",
      "Bánh mì cay Pate",
      "Cà phê cốt dừa",
      "Dừa dầm",
      "Ốc xào cay Hải Phòng"
]
      },
      {
        id: "spot_hp_3",
        name: "Quần thể Di tích Côn Sơn - Kiếp Bạc (Hải Dương)",
        category: "Di tích lịch sử",
        icon: "🏯",
        lat: 21.139,
        lng: 106.401,
        description: "Vùng đất thiêng gắn liền với cuộc đời vị anh hùng dân tộc Trần Hưng Đạo và đại danh nhân văn hóa thế giới Nguyễn Trãi.",
        highlightTag: "Di tích quốc gia đặc biệt",
        subLocations: [
      "Đền Kiếp Bạc bên dòng sông Lục Đầu",
      "Chùa Côn Sơn (Tư Phúc Tự)",
      "Thạch Bàn nơi Nguyễn Trãi ngồi làm thơ",
      "Đỉnh Ngũ Nhạc linh từ"
],
        activities: [
      "Dâng hương tưởng niệm Đức Thánh Trần tại Đền Kiếp Bạc linh thiêng",
      "Thăm Chùa Côn Sơn dạo bước dưới bóng rừng thông reo ngút ngàn",
      "Ngồi nghỉ trên Thạch Bàn ngắm suối Côn Sơn chảy rì rầm như tiếng đàn cầm",
      "Thưởng thức bánh đậu xanh Hải Dương truyền thống và bánh gai Ninh Giang"
],
        foodSpecialties: [
      "Bánh đậu xanh Rồng Vàng",
      "Bánh gai Ninh Giang",
      "Rươi Tứ Kỳ",
      "Vải thiều Thanh Hà"
]
      }
    ]
  },
  {
    id: 'cantho',
    name: 'TP. Cần Thơ',
    province: 'TP. Cần Thơ (mở rộng)',
    provinceType: 'city',
    mergedFrom: 'Hợp nhất TP. Cần Thơ, Hậu Giang và Sóc Trăng',
    region: 'South',
    regionName: 'Miền Nam',
    lat: 10.0452,
    lng: 105.7469,
    image: 'https://images.unsplash.com/photo-1622308644420-a681329c0d50?auto=format&fit=crop&w=800&q=80',
    description: 'Thủ phủ Tây Đô sông nước trù phú với chợ nổi Cái Răng, nét văn hóa chùa Khmer Sóc Trăng độc đáo và kênh rạch xanh mát.',
    tags: ['Chợ nổi Cái Răng', 'Chùa Dơi', 'Miệt vườn sông nước', 'Tây Đô'],
    bestSeason: 'Tháng 9 - 11 (Mùa nước nổi) & Tháng 5 - 8',
    touristSpots: [
      {
        id: "spot_ct_1",
        name: "Chợ nổi Cái Răng & Bến Ninh Kiều",
        category: "Văn hóa sông nước",
        icon: "🛶",
        lat: 10.0035,
        lng: 105.746,
        description: "Nét văn hóa giao thương độc đáo trên sông Tiền, sông Hậu với cây bẹo treo hàng và ghe thuyền buôn bán rộn rã.",
        highlightTag: "Di sản văn hóa phi vật thể",
        subLocations: [
      "Chợ nổi Cái Răng đón bình minh",
      "Bến Ninh Kiều & Cầu Tình Yêu Cần Thơ",
      "Nhà cổ Bình Thủy (Bối cảnh phim 'Người Tình')",
      "Lò hủ tiếu truyền thống Chín Của"
],
        activities: [
      "Đi ghe sáng sớm ăn tô hủ tiếu nóng hổi và uống cà phê lắc ngay trên sông nước",
      "Dạo bến Ninh Kiều lung linh ánh đèn và ngắm cầu Cần Thơ về đêm",
      "Thăm Nhà cổ Bình Thủy chiêm ngưỡng kiến trúc Đông - Tây kết hợp trăm năm tuổi",
      "Trải nghiệm tự tay tráng bánh và thưởng thức hủ tiếu pizza chiên giòn",
      "Thưởng thức Lẩu mắm Dạ Lý và Vịt nấu chao đậm đà phong vị Nam Bộ"
],
        foodSpecialties: [
      "Lẩu mắm Dạ Lý Cần Thơ",
      "Vịt nấu chao Thành Giao",
      "Bánh cống Cần Thơ",
      "Hủ tiếu pizza chiên giòn"
]
      },
      {
        id: "spot_ct_2",
        name: "Quần thể Chùa Khmer & Chùa Dơi (Sóc Trăng)",
        category: "Kiến trúc & Tâm linh",
        icon: "🛕",
        lat: 9.589,
        lng: 105.975,
        description: "Quần thể chùa Khmer cổ kính lộng lẫy với hoa văn dát vàng, nơi đàn dơi ngựa tự nhiên hàng vạn con sinh sống kỳ bí.",
        highlightTag: "Kiến trúc Phật giáo Nam tông",
        subLocations: [
      "Chùa Dơi (Mahatup) cổ tự",
      "Chùa Chén Kiểu (Sro Lôn) khảm chén đĩa sành",
      "Chùa Som Rong (Tượng Phật Thích Ca nằm khổng lồ)",
      "Khu du lịch sinh thái Lung Ngọc Hoàng (Hậu Giang)"
],
        activities: [
      "Chiêm ngưỡng kiến trúc chùa Khmer mái vút cong và tượng thần Nagar",
      "Tận mắt ngắm đàn dơi ngựa tự nhiên hàng vạn con treo mình trên cây cổ thụ Chùa Dơi",
      "Check-in tượng Phật nằm dài 63m uy nghiêm tại Chùa Som Rong",
      "Thưởng thức Bánh pía sầu riêng tươi Sóc Trăng bóc từng lớp vỏ mỏng mịn",
      "Thưởng thức tô Bún nước lèo Sóc Trăng ngát mùi sả và ngải bún"
],
        foodSpecialties: [
      "Bánh pía Sóc Trăng sầu riêng trứng muối",
      "Bún nước lèo Sóc Trăng",
      "Bánh cóng Đại Tâm"
]
      }
    ]
  },
  {
    id: 'hue',
    name: 'TP. Huế',
    province: 'Thành phố Huế',
    provinceType: 'city',
    mergedFrom: 'Giữ nguyên trạng thái đô thị di sản di tích',
    region: 'Central',
    regionName: 'Miền Trung',
    lat: 16.4637,
    lng: 107.5909,
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
    description: 'Cố đô thanh bình bên dòng sông Hương, nơi hội tụ Quần thể di tích Cố đô triều Nguyễn và Nhã nhạc Cung đình được thế giới tôn vinh.',
    tags: ['Cố đô hoàng triều', 'Sông Hương', 'Đại Nội', 'Cung đình'],
    bestSeason: 'Tháng 1 - 4 & Tháng 9 - 10',
    touristSpots: [
      {
        id: "spot_hue_1",
        name: "Quần thể Di tích Cố đô & Đại Nội Huế",
        category: "Di sản Hoàng cung",
        icon: "🏯",
        lat: 16.4699,
        lng: 107.5794,
        description: "Trái tim của triều đại phong kiến cuối cùng ở Việt Nam với cổng Ngọ Môn sừng sững, Điện Thái Hòa dát vàng và Tử Cấm Thành thâm nghiêm.",
        highlightTag: "Di sản văn hóa thế giới UNESCO",
        subLocations: [
      "Cổng Ngọ Môn & Kỳ Đài Huế",
      "Điện Thái Hòa & Tử Cấm Thành",
      "Cung Diên Thọ & Thái Bình Lâu",
      "Bảo tàng Cổ vật Cung đình Huế",
      "Chợ Đông Ba mua đặc sản"
],
        activities: [
      "Thuê cổ phục triều Nguyễn (Áo Nhật Bình, Ngũ Thân) chụp ảnh trong Hoàng Thành",
      "Xem nghi lễ đổi gác tái hiện không khí hoàng gia thời xưa",
      "Thưởng thức Nhã nhạc Cung đình Huế tại Duyệt Thị Đường",
      "Đi chợ Đông Ba thưởng thức Bún bò Huế, bánh bèo, nậm, lọc và mua mè xửng",
      "Check-in thưởng thức 20 món chè cung đình Huế ngọt thanh tại hẻm chè Hùng Vương"
],
        foodSpecialties: [
      "Bún bò Huế Mụ Rơi",
      "Bánh bèo, nậm, lọc",
      "Cơm hến Cồn Hến",
      "Chè bột lọc bọc heo quay",
      "Mè xửng Thiên Hương"
]
      },
      {
        id: "spot_hue_2",
        name: "Dòng Sông Hương & Các Lăng Tẩm Hoàng Gia",
        category: "Cảnh quan & Lịch sử",
        icon: "⛵",
        lat: 16.452,
        lng: 107.585,
        description: "Dòng sông thơ mộng soi bóng ngôi chùa cổ kính Thiên Mụ cùng kiệt tác kiến trúc lăng tẩm Khải Định, Tự Đức, Minh Mạng.",
        highlightTag: "Thi ca & Hội họa xứ Huế",
        subLocations: [
      "Chùa Thiên Mụ & Tháp Phước Duyên",
      "Lăng Khải Định (Kiệt tác khảm sành sứ)",
      "Lăng Tự Đức (Không gian thơ mộng hữu tình)",
      "Đồi Vọng Cảnh ngắm hoàng hôn sông Hương",
      "Làng hương Thủy Xuân rực rỡ"
],
        activities: [
      "Đi thuyền rồng xuôi dòng sông Hương nghe ca Huế và thả đèn hoa đăng cầu may",
      "Viếng Chùa Thiên Mụ thắp hương cầu an và ngắm chuông đồng ngân vang",
      "Chiêm ngưỡng nghệ thuật khảm sành sứ đỉnh cao phương Đông & Tây tại Lăng Khải Định",
      "Check-in làng hương Thủy Xuân rực rỡ sắc màu và học làm nón bài thơ",
      "Đón hoàng hôn lãng mạn trên Đồi Vọng Cảnh ngắm khúc cua sông Hương đẹp như tranh"
],
        foodSpecialties: [
      "Nem lụi chợ Đông Ba",
      "Bánh khoái hoàng cung",
      "Trà Cung Đình Huế",
      "Bánh ép Huế"
]
      }
    ]
  },

  // ==========================================
  // 19 TỈNH HÌNH THÀNH SAU KHI SÁP NHẬP
  // ==========================================
  {
    id: 'tuyenquang',
    name: 'Tỉnh Tuyên Quang',
    province: 'Tuyên Quang & Hà Giang',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Tuyên Quang và tỉnh Hà Giang',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 22.8233,
    lng: 104.9839,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    description: 'Vùng đất địa đầu cực Bắc Tổ quốc với Công viên địa chất toàn cầu Cao nguyên đá Đồng Văn, hẻm vực Tu Sản và hồ sinh thái Na Hang.',
    tags: ['Mã Pí Lèng', 'Cột cờ Lũng Cú', 'Hồ Na Hang', 'Đồng Văn'],
    bestSeason: 'Tháng 9 - 11 (Mùa hoa Tam giác mạch & lúa chín)',
    touristSpots: [
      {
        id: "spot_tq_1",
        name: "Cao nguyên đá Đồng Văn & Đèo Mã Pí Lèng (Hà Giang)",
        category: "Kỳ quan thiên nhiên",
        icon: "🏍️",
        lat: 23.2833,
        lng: 105.3667,
        description: "Công viên địa chất toàn cầu UNESCO sở hữu một trong tứ đại đỉnh đèo hiểm trở bậc nhất và hẻm vực Tu Sản sâu nhất Đông Nam Á.",
        highlightTag: "Đỉnh cao phượt thủ",
        subLocations: [
      "Đèo Mã Pí Lèng (Vua của các con đèo)",
      "Hẻm Tu Sản & Dòng sông Nho Quế xanh ngọc",
      "Cột cờ Quốc gia Lũng Cú (Cực Bắc)",
      "Dinh thự Vua Mèo (Vương Chính Đức)",
      "Phố cổ Đồng Văn đêm rực rỡ"
],
        activities: [
      "Đi thuyền máy xuôi dòng sông Nho Quế ngắm hẻm Tu Sản sừng sững nghìn mét",
      "Chinh phục Đèo Mã Pí Lèng ngắm con đường Hạnh Phúc uốn lượn ven vách đá",
      "Chạm tay vào lá cờ đỏ sao vàng 54m2 trên đỉnh Cột cờ Lũng Cú thiêng liêng",
      "Thưởng thức Thắng cố ngựa và bánh Tam giác mạch nướng than nóng hổi",
      "Nhâm nhi cà phê phố cổ Đồng Văn trong làn sương đêm se lạnh"
],
        foodSpecialties: [
      "Bánh tam giác mạch nướng",
      "Thắng dền Đồng Văn",
      "Thịt lợn đen gác bếp",
      "Cháo ấu tẩu"
]
      },
      {
        id: "spot_tq_2",
        name: "Khu sinh thái Hồ Na Hang - Lâm Bình",
        category: "Sinh thái & Sông nước",
        icon: "🛶",
        lat: 22.35,
        lng: 105.3833,
        description: "Vùng hồ thủy điện rộng lớn được ví như 'Hạ Long giữa cọc trời đại ngàn' với 99 ngọn núi trùng điệp soi bóng nước biếc.",
        highlightTag: "Hạ Long giữa cọc trời",
        subLocations: [
      "Cọc Vài Phạ (Cọc buộc trâu trời)",
      "Thác Khuổi Nhi (Thác massage cá tự nhiên)",
      "Khu di tích lịch sử Tân Trào (Thủ đô kháng chiến)",
      "Bản văn hóa Tày Lâm Bình"
],
        activities: [
      "Đi thuyền du ngoạn lòng hồ Na Hang chiêm ngưỡng hòn Cọc Vài kỳ vĩ",
      "Leo thác Khuổi Nhi ngâm chân dưới dòng nước mát lạnh cho đàn cá massage tự nhiên",
      "Thăm Lán Nà Nưa và Cây đa Tân Trào cội nguồn lịch sử dân tộc",
      "Thưởng thức cá lăng nướng than và xôi ngũ sắc của đồng bào Tày"
],
        foodSpecialties: [
      "Cá lăng Na Hang nướng",
      "Thịt trâu khô Tuyên Quang",
      "Gỏi cá bỗng sông Lô",
      "Bánh gai Chiêm Hóa"
]
      }
    ]
  },
  {
    id: 'laocai',
    name: 'Tỉnh Lào Cai',
    province: 'Lào Cai & Yên Bái',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Lào Cai và tỉnh Yên Bái',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 22.3364,
    lng: 103.8438,
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=800&q=80',
    description: 'Miền sơn cước kỳ vĩ sở hữu đỉnh Fansipan nóc nhà Đông Dương, thị trấn mờ sương Sa Pa và danh thắng ruộng bậc thang Mù Cang Chải.',
    tags: ['Sa Pa', 'Đỉnh Fansipan', 'Mù Cang Chải', 'Săn mây'],
    bestSeason: 'Tháng 9 - 10 (Lúa vàng) & Tháng 12 - 2 (Săn tuyết)',
    touristSpots: [
      {
        id: "spot_lc_1",
        name: "Thị trấn Sa Pa & Nóc nhà Đông Dương Fansipan",
        category: "Kỳ quan & Núi cao",
        icon: "⛰️",
        lat: 22.3033,
        lng: 103.7753,
        description: "Chinh phục đỉnh Fansipan 3.143m bồng bềnh mây trắng, khám phá bản làng H’Mông và tận hưởng khí hậu se lạnh bốn mùa.",
        highlightTag: "Nóc nhà Đông Dương",
        subLocations: [
      "Đỉnh Fansipan 3.143m & Quần thể tâm linh trên mây",
      "Bản Cát Cát của người H’Mông",
      "Tàu hỏa leo núi Mường Hoa",
      "Nhà thờ Đá cổ Sa Pa & Quảng trường",
      "Đèo Ô Quý Hồ & Cầu kính Rồng Mây"
],
        activities: [
      "Chinh phục đỉnh Fansipan bằng cáp treo 3 dây hiện đại và chạm tay vào cột mốc 3.143m",
      "Đi tàu hỏa leo núi ngắm thung lũng hoa Mường Hoa bạt ngàn",
      "Thuê trang phục dân tộc H’Mông chụp ảnh check-in suối Tiên Sa tại bản Cát Cát",
      "Ăn lẩu cá hồi, cá tầm nóng hổi và xiên nướng chợ đêm Sa Pa",
      "Săn hoàng hôn biển mây tại Cổng trời Đèo Ô Quý Hồ - một trong tứ đại đỉnh đèo"
],
        foodSpecialties: [
      "Lẩu cá hồi & cá tầm Sa Pa",
      "Thịt lợn cắp nách nướng than",
      "Thắng cố ngựa Mường Khương",
      "Cơm lam nướng ống tre"
]
      },
      {
        id: "spot_lc_2",
        name: "Danh thắng Ruộng bậc thang Mù Cang Chải (Yên Bái)",
        category: "Danh lam di sản",
        icon: "🌾",
        lat: 21.854,
        lng: 104.085,
        description: "Kiệt tác ruộng bậc thang vàng rực trải dài trên sườn núi do bàn tay đồng bào người Mông kiến tạo qua hàng trăm năm.",
        highlightTag: "Di tích quốc gia đặc biệt",
        subLocations: [
      "Đồi Mâm Xôi La Pán Tẩn",
      "Đồi Móng Ngựa Sáng Nhù",
      "Đèo Khau Phạ (Điểm dù lượn)",
      "Suối khoáng nóng Trạm Tấu",
      "Bản Lìm Mông yên bình"
],
        activities: [
      "Săn ảnh ruộng bậc thang mùa lúa chín vàng óng vào tháng 9 - tháng 10",
      "Bay dù lượn 'Bay trên mùa vàng' từ đỉnh đèo Khau Phạ ngắm trọn thung lũng",
      "Tắm suối khoáng nóng tự nhiên Trạm Tấu thư giãn giữa mây ngàn",
      "Thưởng thức xôi nếp nương Tú Lệ dẻo thơm và cốm xanh nức tiếng"
],
        foodSpecialties: [
      "Xôi nếp nương Tú Lệ",
      "Cốm xanh Tú Lệ",
      "Thịt trâu gác bếp",
      "Cá suối chiên giòn"
]
      }
    ]
  },
  {
    id: 'thainguyen',
    name: 'Tỉnh Thái Nguyên',
    province: 'Thái Nguyên & Bắc Kạn',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Thái Nguyên và tỉnh Bắc Kạn',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 21.5942,
    lng: 105.8482,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Xứ sở chè xanh trứ danh Tân Cương kết hợp với kỳ quan Hồ Ba Bể - một trong 20 hồ nước ngọt tự nhiên lớn nhất thế giới.',
    tags: ['Hồ Ba Bể', 'Đồi chè Tân Cương', 'ATK Định Hóa', 'Hang động'],
    bestSeason: 'Quanh năm, đẹp nhất từ tháng 5 - 10',
    touristSpots: [
      {
        id: "spot_tn_1",
        name: "Vườn quốc gia & Hồ Ba Bể (Bắc Kạn)",
        category: "Kỳ quan sinh thái",
        icon: "🛶",
        lat: 22.4167,
        lng: 105.6167,
        description: "Viên ngọc bích giữa lòng núi đá vôi Đông Bắc, bao quanh bởi rừng nguyên sinh cổ thụ và các bản làng người Tày mến khách.",
        highlightTag: "Vườn di sản ASEAN",
        subLocations: [
      "Hồ Ba Bể (Pé Lầm, Pé Lù, Pé Lèng)",
      "Động Puông dòng sông ngầm chảy qua",
      "Thác Đầu Đẳng hùng vĩ",
      "Bản Pác Ngòi nhà sàn ven hồ",
      "Đảo Bà Góa huyền thoại"
],
        activities: [
      "Đi thuyền độc mộc hoặc thuyền máy lướt nhẹ trên mặt nước hồ Ba Bể phẳng lặng như gương",
      "Khám phá Động Puông thạch nhũ kỳ bí nơi cư ngụ của hàng ngàn con dơi",
      "Nghỉ đêm tại homestay nhà sàn truyền thống Bản Pác Ngòi ngắm sao đêm",
      "Thưởng thức cá hồ Ba Bể nướng than hoa kẹp kẹp tre và tép chua Ba Bể"
],
        foodSpecialties: [
      "Cá mương nướng kẹp tre",
      "Tép chua Ba Bể",
      "Lợn sữa quay mắc mật",
      "Miến dong Na Rì"
]
      },
      {
        id: "spot_tn_2",
        name: "Vùng đồi chè đặc sản Tân Cương & Hồ Núi Cốc",
        category: "Nông nghiệp & Nghỉ dưỡng",
        icon: "🍵",
        lat: 21.55,
        lng: 105.75,
        description: "Những đồi chè bát úp xanh ngắt ngút ngàn tầm mắt, cội nguồn của loại trà Đinh quý hiếm đệ nhất thiên hạ.",
        highlightTag: "Đệ nhất danh trà Việt Nam",
        subLocations: [
      "Không gian văn hóa Trà Tân Cương",
      "Đồi chè Cầu Đá bát úp xanh mướt",
      "Khu du lịch Hồ Núi Cốc huyền thoại chàng Cốc nàng Công",
      "Khu di tích lịch sử ATK Định Hóa"
],
        activities: [
      "Hóa thân thành cô thôn nữ hái búp chè một tôm hai lá vào buổi sớm mai",
      "Trải nghiệm tự tay sao chè thủ công và thưởng thức trà Đinh Tân Cương tiền chát hậu ngọt",
      "Đi du thuyền trên Hồ Núi Cốc khám phá động Huyền Thoại Cung",
      "Thăm ATK Định Hóa an toàn khu trung tâm đầu não kháng chiến"
],
        foodSpecialties: [
      "Trà Đinh Tân Cương thượng hạng",
      "Cơm lam Định Hóa",
      "Bánh chưng Bờ Đậu",
      "Nem chua Đại Từ"
]
      }
    ]
  },
  {
    id: 'phutho',
    name: 'Tỉnh Phú Thọ',
    province: 'Phú Thọ, Vĩnh Phúc & Hòa Bình',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Phú Thọ, Vĩnh Phúc và Hòa Bình',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 21.3227,
    lng: 105.2280,
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    description: 'Vùng đất cội nguồn dân tộc với Đền Hùng linh thiêng, thị trấn mù sương Tam Đảo và thung lũng Mai Châu thơ mộng.',
    tags: ['Đền Hùng', 'Tam Đảo', 'Mai Châu', 'Hồ Hòa Bình'],
    bestSeason: 'Tháng 3 Âm lịch (Giỗ Tổ) & Mùa đông',
    touristSpots: [
      {
        id: "spot_pt_1",
        name: "Khu Di tích Lịch sử Đền Hùng",
        category: "Di tích cội nguồn",
        icon: "🏛️",
        lat: 21.365,
        lng: 105.328,
        description: "Nơi thờ phụng các vua Hùng có công dựng nước, cội nguồn tâm linh thiêng liêng nhất trong tâm thức muôn triệu người con đất Việt.",
        highlightTag: "Cội nguồn dân tộc Việt Nam",
        subLocations: [
      "Đền Hạ, Đền Trung, Đền Thượng núi Nghĩa Lĩnh",
      "Lăng Vua Hùng thứ 6",
      "Đền Giếng (Nơi công chúa Tiên Dung, Ngọc Hoa soi gương)",
      "Bảo tàng Hùng Vương",
      "Làng cổ Hát Xoan Kim Đức"
],
        activities: [
      "Hành hương leo gần 500 bậc đá lên Đền Thượng dâng hương tưởng nhớ các Vua Hùng",
      "Lắng nghe điệu Hát Xoan Phú Thọ di sản văn hóa phi vật thể đại diện của nhân loại",
      "Thăm Bảo tàng Hùng Vương chiêm ngưỡng Trống đồng Đông Sơn và bảo vật quốc gia",
      "Thưởng thức Bánh chưng, bánh giầy dâng vua và thịt chua Thanh Sơn bùi thơm"
],
        foodSpecialties: [
      "Thịt chua Thanh Sơn",
      "Bánh tai Phú Thọ",
      "Cá anh vũ tiến vua",
      "Búp khoai kho tương"
]
      },
      {
        id: "spot_pt_2",
        name: "Khu nghỉ dưỡng Tam Đảo (Vĩnh Phúc)",
        category: "Nghỉ dưỡng & Sương mù",
        icon: "🏰",
        lat: 21.458,
        lng: 105.647,
        description: "Đà Lạt của miền Bắc ẩn mình trên độ cao 900m với các tòa lâu đài phong cách châu Âu và sương mù bồng bềnh bốn mùa se lạnh.",
        highlightTag: "Thị trấn bồng bềnh mây trắng",
        subLocations: [
      "Quảng trường Tam Đảo & Nhà thờ Đá cổ",
      "Cầu Mây & Lâu đài Tam Đảo nguy nga",
      "Thác Bạc dòng nước trắng xóa",
      "Tháp truyền hình Tam Đảo đỉnh núi",
      "Quần thể Tây Thiên di tích danh thắng"
],
        activities: [
      "Check-in Nhà thờ Đá cổ kính phong cách Gothic ngắm toàn cảnh thị trấn mây mù",
      "Săn hoàng hôn và mây trôi bồng bềnh tại Cầu Mây lãng mạn",
      "Thưởng thức ngọn Su su xào tỏi giòn ngọt đặc sản đỉnh núi",
      "Ăn đồ nướng xiên que thơm phức và gà đồi bọc đất nướng than"
],
        foodSpecialties: [
      "Ngọn su su xào tỏi",
      "Gà đồi Tam Đảo nướng bọc giấy bạc",
      "Thịt lợn mán nướng",
      "Rượu ngô Tây Thiên"
]
      },
      {
        id: "spot_pt_3",
        name: "Thung lũng Mai Châu (Hòa Bình)",
        category: "Văn hóa & Sinh thái",
        icon: "🏡",
        lat: 20.6667,
        lng: 105.0833,
        description: "Thung lũng thơ mộng bình yên của đồng bào người Thái với những nếp nhà sàn xinh xắn giữa biển lúa xanh ngắt ngút ngàn.",
        highlightTag: "Bản làng yên bình Tây Bắc",
        subLocations: [
      "Bản Lác & Bản Pom Coọng",
      "Đèo Thung Khe (Đèo Đá Trắng phủ sương tuyết)",
      "Hang Kia - Pà Cò săn mây",
      "Hang Chiều 1.200 bậc đá"
],
        activities: [
      "Đạp xe thong dong quanh bản Lác ngắm cánh đồng lúa và nhà sàn mộc mạc",
      "Dừng chân trên đỉnh Đèo Thung Khe ngắm thung lũng đá trắng mờ sương và ăn ngô nướng",
      "Thưởng thức múa xòe Thái, nhảy sạp và uống rượu cần ngây ngất men say",
      "Ăn cơm lam nướng ống nứa, cá suối nướng Pa Pỉnh Tộp đậm đà gia vị rừng"
],
        foodSpecialties: [
      "Cơm lam nếp nương Mai Châu",
      "Cá suối nướng Pa Pỉnh Tộp",
      "Thịt lợn cắp nách nướng hạt dổi",
      "Rượu cần Mường"
]
      }
    ]
  },
  {
    id: 'bacninh',
    name: 'Tỉnh Bắc Ninh',
    province: 'Bắc Ninh & Bắc Giang',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Bắc Ninh và tỉnh Bắc Giang',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 21.1861,
    lng: 106.0763,
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
    description: 'Cái nôi văn hóa Quan họ Kinh Bắc, vùng đất Phật tích với chùa Dâu, chùa Bút Tháp và danh thắng Tây Yên Tử.',
    tags: ['Dân ca Quan họ', 'Tây Yên Tử', 'Chùa Dâu', 'Vải thiều Lục Ngạn'],
    bestSeason: 'Tháng 1 - 3 (Mùa lễ hội truyền thống)',
    touristSpots: [
      {
        id: "spot_bn_1",
        name: "Cái nôi Quan Họ & Các ngôi Chùa Cổ Kinh Bắc",
        category: "Di sản & Tâm linh",
        icon: "🪕",
        lat: 21.15,
        lng: 106.06,
        description: "Không gian văn hóa Quan họ mượt mà đằm thắm với những ngôi chùa cổ kính bậc nhất Việt Nam lưu giữ bảo vật quốc gia.",
        highlightTag: "Di sản văn hóa phi vật thể UNESCO",
        subLocations: [
      "Chùa Dâu (Ngôi chùa cổ nhất Việt Nam thế kỷ II)",
      "Chùa Bút Tháp (Tượng Phật Bà Quan Âm nghìn mắt nghìn tay)",
      "Đền Đô (Nơi thờ 8 vị vua triều Lý)",
      "Làng tranh dân gian Đông Hồ",
      "Đồi Lim (Hội Lim hát canh Quan họ)"
],
        activities: [
      "Thưởng thức canh hát Quan họ trên thuyền rồng tại Hội Lim nghe câu hát 'Người ơi người ở đừng về'",
      "Đi chùa Dâu chiêm bái tháp Hòa Phong cổ kính và tìm hiểu cội nguồn Phật giáo Việt Nam",
      "Chiêm ngưỡng pho tượng Phật Bà Quan Âm thiên thủ thiên nhãn kiệt tác gỗ tại Chùa Bút Tháp",
      "Tự tay in tranh dân gian Đông Hồ trên giấy điệp truyền thống",
      "Thưởng thức Bánh phu thê Đình Bảng dẻo thơm nhân đậu xanh dừa sợi"
],
        foodSpecialties: [
      "Bánh phu thê Đình Bảng",
      "Nem bùi Ninh Xá",
      "Bánh tẻ làng Chờ",
      "Gà Hồ Thuận Thành tiến vua"
]
      },
      {
        id: "spot_bn_2",
        name: "Khu Di tích Tâm linh Tây Yên Tử (Bắc Giang)",
        category: "Tâm linh & Cảnh quan",
        icon: "⛰️",
        lat: 21.2167,
        lng: 106.75,
        description: "Con đường hoằng dương phật pháp của Phật hoàng Trần Nhân Tông với hệ thống cáp treo xuyên rừng nguyên sinh Khe Rỗ.",
        highlightTag: "Con đường Phật hoàng",
        subLocations: [
      "Quần thể Tây Yên Tử (Chùa Hạ, Chùa Thượng)",
      "Rừng nguyên sinh Khe Rỗ phong phú sinh học",
      "Chùa Vĩnh Nghiêm (Nơi lưu giữ mộc bản di sản ký ức thế giới)",
      "Vùng đồi vải thiều Lục Ngạn bạt ngàn"
],
        activities: [
      "Đi cáp treo Tây Yên Tử ngắm rừng nguyên sinh bạt ngàn và biển mây chập chùng",
      "Thăm Chùa Vĩnh Nghiêm chiêm bái kho mộc bản kinh Phật độc nhất vô nhị",
      "Trekking tắm suối trong lành tại khu bảo tồn thiên nhiên Khe Rỗ",
      "Thưởng thức Vải thiều Lục Ngạn mọng nước ngọt lịm vào tháng 6 mùa thu hoạch"
],
        foodSpecialties: [
      "Vải thiều Lục Ngạn",
      "Bánh đa Kế",
      "Mì Chũ Lục Ngạn",
      "Rượu làng Vân"
]
      }
    ]
  },
  {
    id: 'hungyen',
    name: 'Tỉnh Hưng Yên',
    province: 'Hưng Yên & Thái Bình',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Hưng Yên và tỉnh Thái Bình',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 20.6464,
    lng: 106.0511,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    description: 'Thương cảng Phố Hiến sầm uất xưa "Thứ nhất Kinh Kỳ, thứ nhì Phố Hiến" kết hợp vựa lúa đồng bằng sông Hồng và Chùa Keo cổ kính.',
    tags: ['Phố Hiến', 'Chùa Keo', 'Nhãn lồng', 'Làng nghề chiếu cói'],
    bestSeason: 'Tháng 7 - 9 (Mùa thu hoạch nhãn lồng)',
    touristSpots: [
      {
        id: "spot_hy_1",
        name: "Quần thể Di tích Phố Hiến cổ danh tiếng",
        category: "Di tích lịch sử",
        icon: "🏯",
        lat: 20.65,
        lng: 106.05,
        description: "Thương cảng sầm uất lừng lẫy thế kỷ XVII nơi hội tụ thương nhân quốc tế với những ngôi đền, chùa cổ kính soi bóng Hồ Bán Nguyệt.",
        highlightTag: "Đệ nhị đô hội cổ truyền",
        subLocations: [
      "Hồ Bán Nguyệt thơ mộng",
      "Đền Mẫu linh thiêng bên cây đa cổ thụ trăm tuổi",
      "Chùa Chuông (Phố Hiến đệ nhất danh lam)",
      "Văn Miếu Xích Đằng cổ kính",
      "Đền Chử Đồng Tử - Tiên Dung (Dạ Trạch)"
],
        activities: [
      "Đi dạo ven Hồ Bán Nguyệt ngắm bóng tháp cổ trầm mặc lúc hoàng hôn",
      "Đi đền Mẫu dâng hương cầu tài lộc dưới tán cây đa - si - sanh ba gốc độc đáo",
      "Chiêm ngưỡng hệ thống tượng Phật cổ và chuông đồng tại Chùa Chuông",
      "Thưởng thức Nhãn lồng Hưng Yên cùi dày giòn ngọt lịm và chè sen long nhãn",
      "Ăn bún thang lươn Phố Hiến hương vị đậm đà khó quên"
],
        foodSpecialties: [
      "Nhãn lồng Hưng Yên",
      "Chè hạt sen long nhãn",
      "Bún thang lươn Phố Hiến",
      "Gà Đông Tảo chân khủng"
]
      },
      {
        id: "spot_hy_2",
        name: "Quần thể Chùa Keo & Đền Trần (Thái Bình)",
        category: "Kiến trúc & Lịch sử",
        icon: "🛕",
        lat: 20.4,
        lng: 106.3,
        description: "Ngôi chùa cổ gần 400 năm tuổi với Gác Chuông bằng gỗ lim ba tầng 12 mái kiệt tác kiến trúc đỉnh cao của nghệ thuật điêu khắc gỗ Việt Nam.",
        highlightTag: "Kiệt tác kiến trúc gỗ lim",
        subLocations: [
      "Gác Chuông Chùa Keo ba tầng bằng gỗ",
      "Đền Trần Thái Bình (Nơi phát tích vương triều Trần)",
      "Khu du lịch sinh thái Biển Đồng Châu",
      "Làng nghề chạm bạc Đồng Xâm"
],
        activities: [
      "Chiêm ngưỡng kiến trúc không dùng một chiếc đinh sắt của Gác Chuông Chùa Keo",
      "Dâng hương tưởng nhớ các vị vua triều Trần tại Đền Trần đất phát tích",
      "Ngắm cảnh đồng ngao bãi cọc độc đáo tại bãi biển Đồng Châu lúc bình minh",
      "Thưởng thức Bánh cáy làng Nguyễn dẻo cay thơm mùi gừng và canh cá Quỳnh Côi"
],
        foodSpecialties: [
      "Bánh cáy Làng Nguyễn",
      "Canh cá Quỳnh Côi",
      "Ổi Bo Thái Bình",
      "Nộm sứa Thái Thụy"
]
      }
    ]
  },
  {
    id: 'ninhbinh',
    name: 'Tỉnh Ninh Bình',
    province: 'Ninh Bình, Hà Nam & Nam Định',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Ninh Bình, Hà Nam và Nam Định',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 20.2506,
    lng: 105.9745,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    description: 'Đại không gian di sản văn hóa tâm linh kết hợp Tràng An di sản thế giới kép, chùa Tam Chúc khổng lồ và các nhà thờ cổ ven biển Nam Định.',
    tags: ['Tràng An', 'Hang Múa', 'Chùa Tam Chúc', 'Dê núi Cơm cháy'],
    bestSeason: 'Tháng 1 - 3 (Lễ hội) & Tháng 5 - 6 (Mùa lúa vàng)',
    touristSpots: [
      {
        id: "spot_nb_1",
        name: "Cố đô Hoa Lư (Khu Di tích Lịch sử)",
        category: "Di tích & Lịch sử",
        icon: "🏛️",
        lat: 20.2858,
        lng: 105.9048,
        description: "Kinh đô đầu tiên của nhà nước phong kiến tập quyền Việt Nam thế kỷ X với núi non bao bọc tựa bức tường thành thiên nhiên kiên cố.",
        highlightTag: "Kinh đô đầu tiên của nước Việt",
        subLocations: [
      "Đền Vua Đinh Tiên Hoàng",
      "Đền Vua Lê Đại Hành",
      "Chùa Nhất Trụ (Chùa Cột Kinh ngàn năm)",
      "Động Am Tiên (Tuyệt Tịnh Cốc Ninh Bình)",
      "Núi Mã Yên & Lăng mộ Vua Đinh"
],
        activities: [
      "Đi thuyền ngắm cảnh hồ nước xanh biếc tại Động Am Tiên (Tuyệt Tịnh Cốc)",
      "Ăn đặc sản thịt Dê núi nướng tảng thơm lừng & Cơm cháy Ninh Bình giòn rụm",
      "Đi chùa Nhất Trụ thắp hương vãn cảnh và chiêm bái Cột kinh Phật đá nghìn năm",
      "Đi đền thờ Vua Đinh Tiên Hoàng & Vua Lê Đại Hành dâng hương tìm hiểu lịch sử",
      "Chinh phục đỉnh núi Mã Yên viếng lăng vua và phóng tầm mắt ngắm trọn thung lũng cố đô"
],
        foodSpecialties: [
      "Thịt dê núi nướng tảng",
      "Cơm cháy giòn chấm sốt dê",
      "Rượu Kim Sơn",
      "Nem chua Yên Mạc"
]
      },
      {
        id: "spot_nb_2",
        name: "Quần thể Danh thắng Tràng An & Hang Múa",
        category: "Kỳ quan thiên nhiên",
        icon: "🚣",
        lat: 20.2541,
        lng: 105.9084,
        description: "Di sản thế giới kép UNESCO chèo thuyền nan len lỏi qua hang động nước và chinh phục đỉnh Hang Múa ngắm thung lũng rồng.",
        highlightTag: "Di sản thế giới kép UNESCO",
        subLocations: [
      "Bến thuyền Tràng An (Tuyến hang động nước)",
      "Đỉnh Hang Múa (Vạn Lý Trường Thành thu nhỏ)",
      "Phim trường King Kong (Đảo Đầu Lâu)",
      "Vườn chim Thung Nham & Động Thiên Hà"
],
        activities: [
      "Đi thuyền nan luồn lách qua 12 hang động ngầm thạch nhũ lung linh",
      "Chinh phục 500 bậc đá lên đỉnh Hang Múa check-in ngắm sông Ngô Đồng mùa lúa chín",
      "Chèo thuyền Kayak tự do giữa thung lũng đá vôi kỳ vĩ",
      "Đi thuyền vào vườn chim Thung Nham ngắm hàng vạn cánh cò trắng về tổ lúc hoàng hôn"
],
        foodSpecialties: [
      "Ốc núi luộc sả ớt",
      "Cá rô Tổng Trường chiên xù",
      "Gà đồi Tràng An nướng mật ong"
]
      },
      {
        id: "spot_nb_3",
        name: "Quần thể Tâm linh Bái Đính - Tam Chúc",
        category: "Tâm linh & Kiến trúc",
        icon: "🛕",
        lat: 20.2685,
        lng: 105.8672,
        description: "Quần thể đại tự tâm linh nắm giữ hàng loạt kỷ lục châu Á, nối liền đất thiêng Ninh Bình và Hà Nam.",
        highlightTag: "Kỷ lục châu Á",
        subLocations: [
      "Chùa Bái Đính cổ & Quần thể Bái Đính mới",
      "Chùa Tam Chúc lớn nhất thế giới (Hà Nam)",
      "Hồ Lục Nhạc & Đình Tam Chúc giữa hồ",
      "Bảo tháp 13 tầng & Hành lang 500 vị La Hán"
],
        activities: [
      "Đi xe điện & chiêm bái Đại tượng Phật bằng đồng dát vàng lớn nhất Đông Nam Á",
      "Đi du thuyền trên hồ Tam Chúc ngắm phong cảnh tiên cảnh sơn thủy hữu tình",
      "Dạo bước hành lang 500 vị La Hán đá xanh tinh xảo",
      "Thưởng thức tiệc buffet cơm chay thanh tịnh tại nhà hàng chùa"
],
        foodSpecialties: [
      "Cơm chay Bái Đính",
      "Bánh đa cua Phủ Lý",
      "Chuối ngự Đại Hoàng",
      "Cá kho làng Vũ Đại"
]
      }
    ]
  },
  {
    id: 'quangtri',
    name: 'Tỉnh Quảng Trị',
    province: 'Quảng Trị & Quảng Bình',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Quảng Trị và tỉnh Quảng Bình',
    region: 'Central',
    regionName: 'Miền Trung',
    lat: 17.5388,
    lng: 106.2870,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Vương quốc hang động thế giới Phong Nha - Kẻ Bàng, Sơn Đoòng kết hợp vùng đất lửa lịch sử Cầu Hiền Lương, Thành cổ kiên cường.',
    tags: ['Vương quốc hang động', 'Sơn Đoòng', 'Phong Nha', 'Cầu Hiền Lương'],
    bestSeason: 'Tháng 4 - 8 (Mùa khô khám phá hang động lý tưởng)',
    touristSpots: [
      {
        id: "spot_qt_1",
        name: "Vườn quốc gia Phong Nha - Kẻ Bàng & Sơn Đoòng (Quảng Bình)",
        category: "Kỳ quan đệ nhất động",
        icon: "🧗",
        lat: 17.5833,
        lng: 106.2833,
        description: "Vương quốc hang động thế giới với Động Sơn Đoòng lớn nhất hành tinh, Động Thiên Đường tráng lệ và sông Chày nước xanh ngắt.",
        highlightTag: "Di sản thiên nhiên thế giới UNESCO",
        subLocations: [
      "Động Phong Nha & Động Tiên Sơn",
      "Động Thiên Đường (Hoàng cung trong lòng đất)",
      "Sông Chày - Hang Tối (Zipline & Tắm bùn)",
      "Suối Nước Moọc thiên đường giải nhiệt"
],
        activities: [
      "Đi thuyền máy trên sông Son vào thám hiểm Động Phong Nha thạch nhũ lung linh",
      "Đi bộ trên cầu gỗ dài 1km khám phá vẻ đẹp tráng lệ của Động Thiên Đường",
      "Đu Zipline qua sông Chày và tắm bùn khoáng tự nhiên trong Hang Tối",
      "Thưởng thức gà đồi nướng chấm muối cheo và cá bống kho tiêu cay nồng"
],
        foodSpecialties: [
      "Cháo canh cá lóc Quảng Bình",
      "Bánh lọc bột sắn",
      "Gà nướng muối cheo",
      "Khoai dẻo"
]
      },
      {
        id: "spot_qt_2",
        name: "Vùng đất lửa Lịch sử Quảng Trị",
        category: "Di tích lịch sử",
        icon: "🎖️",
        lat: 16.75,
        lng: 107.1833,
        description: "Mảnh đất kiên cường với hệ thống địa đạo trong lòng đất Vịnh Mốc, vĩ tuyến 17 và Thành cổ 81 ngày đêm máu lửa.",
        highlightTag: "Địa chỉ đỏ cách mạng",
        subLocations: [
      "Địa đạo Vịnh Mốc (Làng ngầm dưới lòng đất)",
      "Cầu Hiền Lương & Sông Bến Hải (Vĩ tuyến 17)",
      "Thành cổ Quảng Trị linh thiêng",
      "Nghĩa trang Liệt sĩ Quốc gia Trường Sơn"
],
        activities: [
      "Chui hầm Địa đạo Vịnh Mốc khám phá kỳ tích sống và chiến đấu sâu 3 tầng lòng đất",
      "Đi bộ qua Cầu Hiền Lương lịch sử chia cắt hai miền Nam - Bắc một thời",
      "Thả hoa đăng tưởng niệm các anh hùng liệt sĩ bên dòng sông Thạch Hãn",
      "Thưởng thức Bánh ướt Phương Lang thịt luộc và cháo bột Hải Lăng"
],
        foodSpecialties: [
      "Bánh ướt Phương Lang",
      "Cháo bột Hải Lăng",
      "Thịt trâu lá trơng",
      "Tiêu Cùa"
]
      }
    ]
  },
  {
    id: 'quangngai',
    name: 'Tỉnh Quảng Ngãi',
    province: 'Quảng Ngãi & Kon Tum',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Quảng Ngãi và tỉnh Kon Tum',
    region: 'Central',
    regionName: 'Miền Trung',
    lat: 15.1205,
    lng: 108.7923,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Sự giao thoa giữa biển đảo núi lửa Lý Sơn xanh màu ngọc bích và thị trấn sương mù Măng Đen - Đà Lạt thứ hai của Tây Nguyên.',
    tags: ['Đảo Lý Sơn', 'Măng Đen', 'Ngã ba Đông Dương', 'Nhà thờ gỗ'],
    bestSeason: 'Tháng 4 - 9',
    touristSpots: [
      {
        id: "spot_qng_1",
        name: "Đảo núi lửa Lý Sơn (Vương quốc tỏi)",
        category: "Biển đảo núi lửa",
        icon: "🌋",
        lat: 15.3833,
        lng: 109.1167,
        description: "Bảo tàng núi lửa biển tự nhiên được hình thành từ dung nham triệu năm với Cổng Tò Vò kiệt tác và cánh đồng tỏi ngát hương.",
        highlightTag: "Vương quốc tỏi & Núi lửa",
        subLocations: [
      "Cổng Tò Vò nham thạch núi lửa",
      "Đỉnh Thới Lới & Cột cờ Tổ quốc",
      "Hang Câu vách đá sừng sững",
      "Đảo Bé (An Bình) Maldives thu nhỏ",
      "Chùa Hang linh thiêng"
],
        activities: [
      "Đón hoàng hôn xuyên qua vòm đá Cổng Tò Vò nham thạch đen bóng",
      "Đi cano sang Đảo Bé lặn ngắm san hô trên thuyền thúng đáy kính",
      "Lên đỉnh Thới Lới ngắm hồ nước ngọt miệng núi lửa triệu năm",
      "Thưởng thức Gỏi tỏi Lý Sơn giòn ngọt, cua huỳnh đế hấp và ốc xà cừ nướng"
],
        foodSpecialties: [
      "Gỏi tỏi Lý Sơn",
      "Cua Huỳnh Đế hấp",
      "Ốc cừ xào sả ớt",
      "Chả cá đỏ củ"
]
      },
      {
        id: "spot_qng_2",
        name: "Khu sinh thái Măng Đen - Đà Lạt thứ hai (Kon Tum)",
        category: "Nghỉ dưỡng đại ngàn",
        icon: "🌲",
        lat: 14.6,
        lng: 108.2833,
        description: "Xứ sở bảy hồ ba thác ẩn mình giữa rừng thông bạt ngàn mát lạnh quanh năm với hoa anh đào nở rộ khắp các con đèo.",
        highlightTag: "Đà Lạt thứ hai Tây Nguyên",
        subLocations: [
      "Thác Pa Sỹ bọt tung trắng xóa",
      "Hồ Đắk Ke êm đềm hoa nở",
      "Tượng Đức Mẹ Măng Đen linh thiêng",
      "Chùa Khánh Lâm trên đỉnh đồi",
      "Rừng thông Măng Đen hoang sơ"
],
        activities: [
      "Đi dạo dưới rừng thông hít thở không khí mát lạnh 18-20 độ C",
      "Ngắm thác Pa Sỹ đổ từ trên cao và dạo quanh hồ Đắk Ke chèo thuyền",
      "Viếng Tượng Đức Mẹ Măng Đen và Chùa Khánh Lâm cầu bình an",
      "Thưởng thức Cơm lam gà nướng Măng Đen chấm muối é thơm phức"
],
        foodSpecialties: [
      "Gà nướng cơm lam Măng Đen",
      "Lẩu cá tầm măng chua",
      "Nộm hoa chuối rừng",
      "Rượu sim Măng Đen"
]
      }
    ]
  },
  {
    id: 'gialai',
    name: 'Tỉnh Gia Lai',
    province: 'Gia Lai & Bình Định',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Gia Lai và tỉnh Bình Định',
    region: 'Central',
    regionName: 'Miền Trung',
    lat: 13.9833,
    lng: 108.0000,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    description: 'Kết nối cao nguyên đại ngàn Biển Hồ T’nưng với vùng biển Quy Nhơn hoang sơ kỳ vĩ Eo Gió - Kỳ Co và đất võ Tây Sơn.',
    tags: ['Biển Hồ Pleiku', 'Eo Gió Kỳ Co', 'Đất võ Tây Sơn', 'Tháp Bánh Ít'],
    bestSeason: 'Tháng 1 - 8',
    touristSpots: [
      {
        id: "spot_gl_1",
        name: "Vịnh biển Kỳ Co - Eo Gió & Quy Nhơn (Bình Định)",
        category: "Biển đảo & Cảnh quan",
        icon: "🏖️",
        lat: 13.9167,
        lng: 109.3,
        description: "Eo biển hút gió đẹp nhất Việt Nam với con đường đi bộ ven biển ngoạn mục ôm lấy vịnh biển Kỳ Co làn nước trong vắt hai màu.",
        highlightTag: "Maldives của miền Trung",
        subLocations: [
      "Eo Gió (Con đường ven vách đá)",
      "Bãi biển Kỳ Co (Thiên đường biển xanh)",
      "Tháp Bánh Ít (Quần thể tháp Chăm cổ)",
      "Bãi tắm Hoàng Hậu (Bãi Đá Trứng Ghềnh Ráng)"
],
        activities: [
      "Đi cano cao tốc ra bãi Kỳ Co tắm biển và lặn ngắm rạn san hô Bãi Dứa",
      "Đi dạo trên con đường ven biển Eo Gió đón từng luồng gió mát rượi từ biển cả",
      "Thăm khu du lịch Ghềnh Ráng viếng mộ nhà thơ Hàn Mặc Tử",
      "Thưởng thức Bánh xèo tôm nhảy rau mầm giòn rụm và chả ram tôm đất"
],
        foodSpecialties: [
      "Bánh xèo tôm nhảy Rau Mầm",
      "Chả ram tôm đất Bình Định",
      "Bún chả cá Quy Nhơn",
      "Bánh ít lá gai"
]
      },
      {
        id: "spot_gl_2",
        name: "Biển Hồ Pleiku (T’nưng) & Núi lửa Chư Đăng Ya",
        category: "Kỳ quan thiên nhiên",
        icon: "🌋",
        lat: 14.05,
        lng: 108.0,
        description: "Viên ngọc bích 'Đôi mắt Pleiku Biển Hồ đầy' miệng núi lửa đã tắt triệu năm và mùa hoa dã quỳ nở vàng rực sườn núi Chư Đăng Ya.",
        highlightTag: "Đôi mắt Pleiku huyền thoại",
        subLocations: [
      "Biển Hồ T’nưng mênh mông nước biếc",
      "Hàng thông trăm tuổi Biển Hồ Chè",
      "Núi lửa Chư Đăng Ya mùa hoa dã quỳ",
      "Chùa Minh Thành kiến trúc Nhật Bản độc đáo"
],
        activities: [
      "Đi bộ trên con đường thông cổ thụ chụp ảnh sống ảo và ngắm đồi chè xanh mướt",
      "Dừng chân bên đài vọng cảnh Biển Hồ phóng tầm mắt ra mặt nước phẳng lặng như gương",
      "Leo miệng núi lửa Chư Đăng Ya ngắm ngàn sắc vàng dã quỳ vào tháng 11",
      "Ăn Phở hai tô Gia Lai (Phở khô) độc đáo và thưởng thức cà phê Pleiku đậm vị"
],
        foodSpecialties: [
      "Phở khô Gia Lai (Phở hai tô)",
      "Bò một nắng chấm muối kiến vàng",
      "Gà nướng sa lửa",
      "Cà phê Robusta Pleiku"
]
      }
    ]
  },
  {
    id: 'khanhhoa',
    name: 'Tỉnh Khánh Hòa',
    province: 'Khánh Hòa & Ninh Thuận',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Khánh Hòa và tỉnh Ninh Thuận',
    region: 'Central',
    regionName: 'Miền Trung',
    lat: 12.2388,
    lng: 109.1967,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Thủ phủ vịnh biển nghỉ dưỡng hàng đầu thế giới với vịnh Nha Trang, cung đường đèo Vĩnh Hy ngoạn mục và văn hóa tháp Chăm cổ xưa.',
    tags: ['Vịnh Nha Trang', 'Vịnh Vĩnh Hy', 'Tháp Po Klong Garai', 'Lặn san hô'],
    bestSeason: 'Tháng 1 - 9',
    touristSpots: [
      {
        id: "spot_kh_1",
        name: "Vịnh biển Nha Trang & Quần đảo Hòn Mun",
        category: "Biển đảo & Lặn biển",
        icon: "🤿",
        lat: 12.2388,
        lng: 109.1967,
        description: "Một trong 29 vịnh biển đẹp nhất thế giới sở hữu khu bảo tồn biển Hòn Mun với hàng trăm loài san hô và sinh vật biển rực rỡ.",
        highlightTag: "Vịnh biển đẹp nhất thế giới",
        subLocations: [
      "Đảo Hòn Mun (Khu bảo tồn san hô)",
      "Bãi biển Trần Phú trung tâm",
      "Tháp Bà Ponagar Champa nghìn năm",
      "Viện Hải dương học Nha Trang",
      "Suối khoáng nóng Tháp Bà (Tắm bùn)"
],
        activities: [
      "Đi cano cao tốc tham gia tour lặn biển ngắm rạn san hô ngũ sắc tại Hòn Mun",
      "Trải nghiệm tắm bùn khoáng nóng thiên nhiên phục hồi năng lượng",
      "Tham quan Tháp Bà Ponagar thưởng thức điệu múa Chăm truyền thống huyền bí",
      "Ăn nem nướng Nha Trang Đặng Văn Quyên cuốn bánh tráng giòn và bún sứa chả cá",
      "Dạo bãi biển đêm và thưởng thức cocktail bên quán bar ven biển lộng gió"
],
        foodSpecialties: [
      "Nem nướng Ninh Hòa Đặng Văn Quyên",
      "Bún sứa chả cá Nha Trang",
      "Bánh căn mực trứng",
      "Yến sào Khánh Hòa"
]
      },
      {
        id: "spot_kh_2",
        name: "Thiên đường giải trí VinWonders Hòn Tre",
        category: "Công viên giải trí",
        icon: "🎢",
        lat: 12.218,
        lng: 109.245,
        description: "Quần thể công viên giải trí đẳng cấp quốc tế trên đảo ngọc với cáp treo vượt biển, công viên nước và các show diễn thực cảnh hoành tráng.",
        highlightTag: "Công viên giải trí kỷ lục",
        subLocations: [
      "Cáp treo vượt biển Hòn Tre",
      "Công viên nước Water World bên bờ biển",
      "Khu trò chơi cảm giác mạnh Adventure Land",
      "Vườn thú Quý Vương King’s Garden",
      "Show thực cảnh triệu đô Tata Show"
],
        activities: [
      "Đi cáp treo vượt biển ngắm vịnh Nha Trang toàn cảnh từ độ cao 54m",
      "Chinh phục đường trượt zipline dài nhất Việt Nam và tàu lượn siêu tốc",
      "Thưởng thức siêu show diễn thực cảnh đa phương tiện Tata Show triệu đô lúc 19:30",
      "Khám phá Vườn hoa The World Garden hội tụ ngàn kỳ hoa dị thảo năm châu"
],
        foodSpecialties: [
      "Tiệc buffet quốc tế đỉnh đồi",
      "Hải sản nướng trên đảo"
]
      },
      {
        id: "spot_kh_3",
        name: "Vịnh Vĩnh Hy & Hang Rái (Ninh Thuận)",
        category: "Kỳ quan thiên nhiên",
        icon: "🦀",
        lat: 11.72,
        lng: 109.195,
        description: "Vịnh biển nguyên sơ nằm lọt thỏm giữa dãy núi đá Vườn quốc gia Núi Chúa và thềm san hô cổ hóa thạch Hang Rái độc nhất vô nhị.",
        highlightTag: "Vịnh biển hoang sơ tuyệt mỹ",
        subLocations: [
      "Vịnh Vĩnh Hy nước trong thấu đáy",
      "Hang Rái (Thác nước tự nhiên trên biển)",
      "Vườn nho Thái An trĩu quả",
      "Cung đường đèo ven biển DT702 đẹp nhất Việt Nam"
],
        activities: [
      "Đi tàu đáy kính ngắm san hô sống và thưởng thức hải sản trên nhà bè Vĩnh Hy",
      "Săn bình minh kỳ ảo trên thềm san hô cổ triệu năm tuổi tại Hang Rái",
      "Tự tay hái nho tươi mọng nước tại vườn và thưởng thức mật nho Ninh Thuận ngọt lịm",
      "Lái xe máy vi vu trên cung đường đèo ven biển một bên là núi Chúa một bên là biển xanh ngắt"
],
        foodSpecialties: [
      "Bánh xèo mực nhảy Phan Rang",
      "Nho tươi & Rượu nho Ninh Thuận",
      "Thịt cừu nướng thảo mộc"
]
      }
    ]
  },
  {
    id: 'lamdong',
    name: 'Tỉnh Lâm Đồng',
    province: 'Lâm Đồng, Đắk Nông & Bình Thuận',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Lâm Đồng, Đắk Nông và Bình Thuận',
    region: 'Central',
    regionName: 'Miền Trung (Tây Nguyên - Duyên Hải)',
    lat: 11.9404,
    lng: 108.4583,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Hành trình từ rừng thông mộng mơ Đà Lạt xuống đồi cát bay Mũi Né - Phan Thiết và vịnh Tà Đùng - Vịnh Hạ Long của Tây Nguyên.',
    tags: ['Đà Lạt', 'Đồi cát Mũi Né', 'Hồ Tà Đùng', 'Rừng thông'],
    bestSeason: 'Quanh năm, đẹp nhất từ tháng 11 - 4',
    touristSpots: [
      {
        id: "spot_ld_1",
        name: "Thành phố ngàn hoa Đà Lạt & Hồ Xuân Hương",
        category: "Nghỉ dưỡng & Sống ảo",
        icon: "🌸",
        lat: 11.9404,
        lng: 108.4583,
        description: "Thành phố tình yêu se lạnh quanh năm với những đồi thông reo, vườn hoa khoe sắc và văn hóa cà phê săn mây độc đáo.",
        highlightTag: "Thành phố sương mù lãng mạn",
        subLocations: [
      "Hồ Xuân Hương & Quảng trường Lâm Viên",
      "Chợ đêm Đà Lạt (Chợ Âm Phủ)",
      "Đỉnh Langbiang huyền thoại",
      "Đồi chè Cầu Đất săn mây",
      "Ga xe lửa cổ Đà Lạt"
],
        activities: [
      "Đạp vịt trên mặt hồ Xuân Hương đón sương sớm bảng lảng",
      "Ăn bánh tráng nướng Đà Lạt giòn rụm & uống sữa đậu nành nóng hổi chợ đêm",
      "Dậy sớm lên đồi chè Cầu Đất đón bình minh và săn biển mây cuồn cuộn",
      "Check-in Quảng trường Lâm Viên bên đóa hoa dã quỳ và nụ Atiso khổng lồ",
      "Thưởng thức Lẩu gà lá é Tao Ngộ và Lẩu bò Ba Toa nghi ngút khói"
],
        foodSpecialties: [
      "Lẩu gà lá é Tao Ngộ",
      "Lẩu bò Ba Toa quán Gỗ",
      "Bánh ướt lòng gà",
      "Bánh tráng nướng",
      "Dâu tây tươi Đà Lạt"
]
      },
      {
        id: "spot_ld_2",
        name: "Đồi cát bay Mũi Né & Phan Thiết (Bình Thuận)",
        category: "Biển & Sa mạc",
        icon: "🏜️",
        lat: 10.9333,
        lng: 108.2833,
        description: "Thiên đường sa mạc cát mênh mông ôm lấy bờ biển ngọc, nơi có những đồi cát đổi màu kỳ ảo và gió lộng bốn mùa.",
        highlightTag: "Sa mạc cát trắng Việt Nam",
        subLocations: [
      "Đồi Cát Trắng (Bàu Trắng) & Bàu Sen",
      "Đồi Cát Bay (Đồi Cát Đỏ)",
      "Suối Tiên Mũi Né (Hẻm núi đất đỏ)",
      "Làng chài Mũi Né nhộn nhịp",
      "Tháp Chàm Poshanư cổ"
],
        activities: [
      "Lái xe địa hình ATV bốn bánh vượt đỉnh đồi cát Bàu Trắng cảm giác cực mạnh",
      "Trượt cát bằng máng trượt từ đỉnh đồi dốc ngắm cảnh hồ sen bát ngát",
      "Lội dòng nước mát lành khám phá hẻm núi đất đỏ tự nhiên tại Suối Tiên",
      "Thức dậy sớm đón bình minh làng chài và thưởng thức hải sản ghẹ, sò điệp tươi nướng mỡ hành"
],
        foodSpecialties: [
      "Lẩu thả Mũi Né",
      "Bánh quai vạc",
      "Gỏi cá mai Phan Thiết",
      "Răng mực nướng giòn"
]
      },
      {
        id: "spot_ld_3",
        name: "Hồ Tà Đùng - Vịnh Hạ Long Tây Nguyên (Đắk Nông)",
        category: "Kỳ quan sinh thái",
        icon: "🏝️",
        lat: 11.86,
        lng: 107.98,
        description: "Hơn 40 hòn đảo lớn nhỏ nhấp nhô trên mặt hồ xanh biếc phẳng lặng tạo nên cảnh tượng kỳ vĩ như tranh thủy mặc giữa đại ngàn.",
        highlightTag: "Vịnh Hạ Long giữa đại ngàn",
        subLocations: [
      "Lòng hồ Tà Đùng và các ốc đảo xanh",
      "Cầu kính Tà Đùng ngắm toàn cảnh",
      "Thác Liêng Nung huyền bí",
      "Vườn quốc gia Tà Đùng"
],
        activities: [
      "Đi thuyền du ngoạn lòng hồ len lỏi qua các ốc đảo xanh ngát",
      "Check-in cầu kính trên đỉnh đồi ngắm trọn vẹn toàn cảnh hồ từ trên cao",
      "Cắm trại qua đêm bên hồ ngắm dải ngân hà và bầu trời sao Tây Nguyên",
      "Thưởng thức cá lăng nướng than, cơm lam ống tre và rượu cần người Mạ"
],
        foodSpecialties: [
      "Cá lăng nướng than lòng hồ",
      "Cơm lam gà đồi nướng",
      "Rượu cần Tây Nguyên"
]
      }
    ]
  },
  {
    id: 'daklak',
    name: 'Tỉnh Đắk Lắk',
    province: 'Đắk Lắk & Phú Yên',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Đắk Lắk và tỉnh Phú Yên',
    region: 'Central',
    regionName: 'Miền Trung',
    lat: 12.6667,
    lng: 108.0500,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'Thủ phủ cà phê Buôn Ma Thuột hùng tráng tiếng cồng chiêng kết hợp xứ sở "Hoa vàng trên cỏ xanh" Gành Đá Đĩa Phú Yên.',
    tags: ['Cà phê Buôn Ma Thuột', 'Gành Đá Đĩa', 'Mũi Điện', 'Thác Dray Nur'],
    bestSeason: 'Tháng 12 - 5',
    touristSpots: [
      {
        id: "spot_dl_1",
        name: "Gành Đá Đĩa & Mũi Điện Đại Lãnh (Phú Yên)",
        category: "Kỳ quan địa chất",
        icon: "🌊",
        lat: 13.3667,
        lng: 109.2833,
        description: "Hiện tượng địa chất kỳ thú hiếm hoi trên thế giới với hàng vạn cột đá bazan hình lục giác xếp lớp cạnh bờ sóng biển ngọc.",
        highlightTag: "Kiệt tác đá bazan độc nhất",
        subLocations: [
      "Gành Đá Đĩa (Kỳ quan đá lục giác)",
      "Mũi Điện Đại Lãnh (Nơi đón ánh bình minh đầu tiên)",
      "Bãi Môn cát vàng nước trong vắt",
      "Vịnh Vũng Rô & Di tích Tàu Không Số",
      "Tháp Nghinh Phong biểu tượng mới"
],
        activities: [
      "Chiêm ngưỡng các khối đá hình trụ xếp chồng lên nhau như tổ ong khổng lồ sát biển",
      "Đón tia nắng bình minh đầu tiên trên đất liền Việt Nam tại ngọn Hải đăng Đại Lãnh",
      "Ăn hải sản trên bè nổi vịnh Vũng Rô ngắm mặt nước xanh thẳm",
      "Thưởng thức Mắt cá ngừ đại dương hầm thuốc bắc bổ dưỡng trứ danh xứ 'Hoa vàng cỏ xanh'"
],
        foodSpecialties: [
      "Mắt cá ngừ đại dương hầm thuốc bắc",
      "Bánh canh hẹ Sông Cầu",
      "Gỏi cá mai đầm Ô Loan",
      "Bò một nắng Phú Yên"
]
      },
      {
        id: "spot_dl_2",
        name: "Thủ phủ Cà phê Buôn Ma Thuột & Hồ Lắk",
        category: "Văn hóa Tây Nguyên",
        icon: "☕",
        lat: 12.6667,
        lng: 108.05,
        description: "Thủ phủ cà phê Việt Nam với Bảo tàng Thế giới Cà phê kiến trúc nhà dài cách điệu, hồ nước ngọt Hồ Lắk và Thác Dray Nur hùng tráng.",
        highlightTag: "Thủ phủ cà phê thế giới",
        subLocations: [
      "Bảo tàng Thế giới Cà phê hiện đại",
      "Hồ Lắk & Biệt điện Bảo Đại",
      "Thác Dray Nur & Dray Sap bọt tung trắng xóa",
      "Buôn Đôn (Bản Đôn huyền thoại voi)",
      "Làng cà phê Trung Nguyên"
],
        activities: [
      "Check-in Bảo tàng Thế giới Cà phê thưởng thức các phong cách cà phê năm châu",
      "Chèo thuyền độc mộc trên Hồ Lắk ngắm hoàng hôn thanh bình của người M’Nông",
      "Trekking men theo vách đá chiêm ngưỡng dòng nước gầm thét dữ dội tại Thác Dray Nur",
      "Thưởng thức Bún đỏ Buôn Ma Thuột, gà nướng Bản Đôn và rượu cần nồng nàn"
],
        foodSpecialties: [
      "Bún đỏ Buôn Ma Thuột",
      "Gà nướng Bản Đôn chấm muối ớt rừng",
      "Cà phê chồn Buôn Ma Thuột",
      "Cơm lam"
]
      }
    ]
  },
  {
    id: 'dongnai',
    name: 'Tỉnh Đồng Nai',
    province: 'Đồng Nai & Bình Phước',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Đồng Nai và tỉnh Bình Phước',
    region: 'South',
    regionName: 'Miền Nam',
    lat: 10.9574,
    lng: 106.8427,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Cửa ngõ Đông Nam Bộ sở hữu Vườn quốc gia Cát Tiên khu dự trữ sinh quyển thế giới và bạt ngàn rừng cao su, vườn điều Bình Phước.',
    tags: ['Vườn quốc gia Cát Tiên', 'Hồ Trị An', 'Bù Gia Mập', 'Thác Mơ'],
    bestSeason: 'Tháng 11 - 5',
    touristSpots: [
      {
        id: "spot_dnai_1",
        name: "Vườn quốc gia Cát Tiên",
        category: "Kỳ quan sinh quyển",
        icon: "🦏",
        lat: 11.4167,
        lng: 107.4167,
        description: "Khu dự trữ sinh quyển thế giới được UNESCO công nhận với rừng mưa nhiệt đới cổ thụ ngàn năm và tour xem thú ăn đêm độc nhất.",
        highlightTag: "Khu dự trữ sinh quyển thế giới",
        subLocations: [
      "Bàu Sấu (Đầm lầy cá sấu nước ngọt tự nhiên)",
      "Cây Tung đại thụ 500 năm tuổi",
      "Trung tâm cứu hộ động vật hoang dã",
      "Thác Bến Cự mát rượi"
],
        activities: [
      "Đi xe mui trần ngắm thú rừng hoang dã (hươu, nai, lợn rừng, chồn) kiếm ăn lúc 19:00 đêm",
      "Trekking 5km xuyên rừng đến Bàu Sấu chèo thuyền ngắm cá sấu tự nhiên bơi lội",
      "Chiêm ngưỡng bộ rễ cây Tung khổng lồ uốn lượn như bức tường thành tự nhiên",
      "Thưởng thức cá lăng sông Đồng Nai nấu canh chua lá giang"
],
        foodSpecialties: [
      "Cá lăng sông Đồng Nai",
      "Rau rừng chấm kho quẹt",
      "Gỏi bưởi Tân Triều",
      "Rượu bưởi Đồng Nai"
]
      },
      {
        id: "spot_dnai_2",
        name: "Khu du lịch Suối Mơ & Thác Giang Điền",
        category: "Dã ngoại & Tắm suối",
        icon: "🏊",
        lat: 11.1,
        lng: 107.15,
        description: "Công viên sinh thái suối khoáng tự nhiên trong vắt nhìn thấy từng đàn cá bơi lội, điểm cắm trại lý tưởng cuối tuần.",
        highlightTag: "Thiên đường tắm suối tự nhiên",
        subLocations: [
      "Công viên suối khoáng Suối Mơ",
      "Thác Giang Điền ba dòng thác đổ",
      "Vườn trái cây Long Khánh bạt ngàn",
      "Khu du lịch Bửu Long (Vịnh Hạ Long trên cạn)"
],
        activities: [
      "Đắm mình trong làn nước suối mát lạnh tự nhiên và chèo thuyền Kayak",
      "Hái trái cây tươi ngon sầu riêng, chôm chôm, măng cụt tại vườn Long Khánh",
      "Cắm trại nướng BBQ bên bờ thác róc rách",
      "Thưởng thức cơm gà nướng ống tre và gỏi tép tươi"
],
        foodSpecialties: [
      "Bưởi Tân Triều",
      "Trái cây Long Khánh",
      "Gà thả vườn nướng muối ớt",
      "Chả đùm"
]
      }
    ]
  },
  {
    id: 'tayninh',
    name: 'Tỉnh Tây Ninh',
    province: 'Tây Ninh & Long An',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Tây Ninh và tỉnh Long An',
    region: 'South',
    regionName: 'Miền Nam',
    lat: 11.3102,
    lng: 106.0983,
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    description: 'Nóc nhà Đông Nam Bộ Núi Bà Đen linh thiêng mây phủ kết hợp Tòa thánh Tây Ninh và Làng nổi Tân Lập Đồng Tháp Mười.',
    tags: ['Núi Bà Đen', 'Tòa thánh Cao Đài', 'Làng nổi Tân Lập', 'Bánh tráng phơi sương'],
    bestSeason: 'Quanh năm, đẹp nhất từ tháng 11 - 4',
    touristSpots: [
      {
        id: "spot_tninh_1",
        name: "Quần thể Danh thắng Núi Bà Đen",
        category: "Tâm linh & Đỉnh núi",
        icon: "⛰️",
        lat: 11.3789,
        lng: 106.1689,
        description: "Nóc nhà Nam Bộ cao 986m sở hữu Đại tượng Phật Bà Tây Bổ Đà Sơn bằng đồng cao nhất châu Á và hệ thống cáp treo Sun World hiện đại.",
        highlightTag: "Nóc nhà Nam Bộ 986m",
        subLocations: [
      "Đỉnh Núi Bà Đen & Quảng trường Phật giáo",
      "Đại tượng Phật Bà Tây Bổ Đà Sơn 72m",
      "Chùa Bà (Linh Sơn Tiên Thạch Tự)",
      "Cáp treo Vân Sơn ngắm biển mây",
      "Vườn hoa hướng dương trên đỉnh núi"
],
        activities: [
      "Đi cáp treo Sun World lên nóc nhà Nam Bộ săn biển mây cuồn cuộn vào sáng sớm",
      "Chiêm bái Đại tượng Phật Bà bằng đồng cao kỷ lục châu Á và đảnh lễ xá lợi Phật",
      "Hành hương viếng Chùa Bà Đen cầu bình an, may mắn và công danh",
      "Thưởng thức tiệc buffet ẩm thực trên đỉnh núi mây mù se lạnh 18 độ C",
      "Ăn Bánh tráng phơi sương cuốn thịt heo luộc chấm mắm nêm Tây Ninh"
],
        foodSpecialties: [
      "Bánh tráng phơi sương Trảng Bàng",
      "Bò tơ Tây Ninh nướng",
      "Muối tôm Tây Ninh",
      "Mãng cầu Bà Đen"
]
      },
      {
        id: "spot_tninh_2",
        name: "Tòa Thánh Cao Đài & Làng nổi Tân Lập (Long An)",
        category: "Kiến trúc & Sinh thái",
        icon: "🛕",
        lat: 11.3,
        lng: 106.13,
        description: "Thánh địa của đạo Cao Đài với kiến trúc độc nhất vô nhị trên thế giới và con đường mòn xuyên rừng tràm bạt ngàn Tân Lập.",
        highlightTag: "Kiến trúc tôn giáo độc nhất",
        subLocations: [
      "Tòa Thánh Tây Ninh (Kiến trúc Long mã bái sư)",
      "Khu du lịch sinh thái Làng nổi Tân Lập",
      "Con đường đi bộ xuyên rừng tràm 5km",
      "Hồ Dầu Tiếng hồ nhân tạo lớn nhất VN"
],
        activities: [
      "Tham dự buổi lễ cầu nguyện trang nghiêm lúc 12:00 trưa tại Tòa Thánh",
      "Đi thuyền xuồng ba lá len lỏi qua rạch rừng tràm xanh ngắt Tân Lập",
      "Đi bộ trên con đường xi măng ngoằn ngoèo xuyên rừng tràm chụp ảnh sống ảo",
      "Cắm trại đón hoàng hôn bên bờ Hồ Dầu Tiếng mênh mông như biển hồ"
],
        foodSpecialties: [
      "Nem bưởi Tây Ninh",
      "Thèo lèo Tây Ninh",
      "Lẩu mắm Long An",
      "Cá lóc nướng trui"
]
      }
    ]
  },
  {
    id: 'dongthap',
    name: 'Tỉnh Đồng Tháp',
    province: 'Đồng Tháp & Tiền Giang',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Đồng Tháp và tỉnh Tiền Giang',
    region: 'South',
    regionName: 'Miền Nam',
    lat: 10.4578,
    lng: 105.6322,
    image: 'https://images.unsplash.com/photo-1622308644420-a681329c0d50?auto=format&fit=crop&w=800&q=80',
    description: 'Thủ phủ sen hồng Đồng Tháp Mười, vườn chim sếu đầu đỏ Tràm Chim và xứ sở miệt vườn cây trái Cù lao Thới Sơn.',
    tags: ['Làng hoa Sa Đéc', 'Vườn quốc gia Tràm Chim', 'Cù lao Thới Sơn', 'Xứ Sen hồng'],
    bestSeason: 'Tháng 8 - 11 (Mùa sen & nước nổi) & Giáp Tết',
    touristSpots: [
      {
        id: "spot_dt_1",
        name: "Làng hoa kiểng Sa Đéc & Nhà cổ Huỳnh Thủy Lê",
        category: "Hoa kiểng & Di sản",
        icon: "🌺",
        lat: 10.2933,
        lng: 105.7567,
        description: "Thủ phủ hoa kiểng trăm năm tuổi miền Tây nơi ngàn loài hoa nở rực rỡ trên giàn nước và ngôi nhà cổ gắn liền thiên tình sử Người Tình.",
        highlightTag: "Thủ phủ hoa kiểng miền Tây",
        subLocations: [
      "Làng hoa Sa Đéc bạt ngàn trên giàn nước",
      "Nhà cổ Huỳnh Thủy Lê (Tiểu thuyết L'Amant)",
      "Chùa Lá Sen (Chùa Phước Kiển lá sen khổng lồ)",
      "Vườn hoa kiểng Tư Tôn lâu đời"
],
        activities: [
      "Đi thuyền chèo hoặc đi xe điện dạo quanh làng hoa chụp ảnh muôn sắc hoa xuân",
      "Đứng trên lá sen vua khổng lồ đường kính 2-3m nổi trên mặt nước chùa Phước Kiển",
      "Khám phá kiến trúc Đông Dương độc đáo tại Nhà cổ Huỳnh Thủy Lê",
      "Thưởng thức Hủ tiếu Sa Đéc sợi dai giòn nước dùng ngọt thanh gia truyền"
],
        foodSpecialties: [
      "Hủ tiếu Sa Đéc Bà Sẩm",
      "Nem Lai Vung chua ngọt",
      "Bánh phồng tôm Sa Giang",
      "Vịt nướng Sa Đéc"
]
      },
      {
        id: "spot_dt_2",
        name: "Vườn quốc gia Tràm Chim & Cù lao Thới Sơn (Tiền Giang)",
        category: "Sinh thái & Sông nước",
        icon: "🦩",
        lat: 10.7,
        lng: 105.5,
        description: "Khu Ramsar thứ 4 của Việt Nam xứ sở của loài Sếu đầu đỏ quý hiếm và không gian miệt vườn sông nước Tiền Giang trĩu quả.",
        highlightTag: "Khu Ramsar quốc tế",
        subLocations: [
      "Vườn quốc gia Tràm Chim (Ngắm sếu đầu đỏ)",
      "Khu du lịch Cù lao Thới Sơn (Cồn Lân)",
      "Chợ nổi Cái Bè sầm uất",
      "Trại rắn Đồng Tâm lớn nhất Đông Nam Á"
],
        activities: [
      "Đi tắc ráng len lỏi qua đồng sen bát ngát và trảng cỏ bạt ngàn ngắm chim trời",
      "Chèo xuồng ba lá dưới bóng dừa nước xanh mát tại Cù lao Thới Sơn",
      "Thưởng thức Đờn ca tài tử Nam Bộ và ăn trái cây nhiệt đới tươi hái tại vườn",
      "Uống trà mật ong hoa nhãn ngọt lành và xem làm kẹo dừa"
],
        foodSpecialties: [
      "Cá lóc nướng trui cuốn lá sen non",
      "Lẩu cua đồng hoa điên điển",
      "Hủ tiếu Mỹ Tho",
      "Ốc treo giàn bếp"
]
      }
    ]
  },
  {
    id: 'vinhlong',
    name: 'Tỉnh Vĩnh Long',
    province: 'Vĩnh Long, Bến Tre & Trà Vinh',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Vĩnh Long, Bến Tre và Trà Vinh',
    region: 'South',
    regionName: 'Miền Nam',
    lat: 10.2537,
    lng: 105.9722,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Xứ sở dừa Bến Tre xanh mát, cù lao An Bình sum suê sầu riêng chôm chôm và nét văn hóa chùa Hang Trà Vinh cổ thụ rợp bóng.',
    tags: ['Xứ Dừa Bến Tre', 'Cù lao An Bình', 'Chùa Hang Trà Vinh', 'Miệt vườn'],
    bestSeason: 'Tháng 5 - 8 (Mùa trái cây rộ chín cây)',
    touristSpots: [
      {
        id: "spot_vl_1",
        name: "Xứ dừa Bến Tre & Cồn Phụng Đạo Dừa",
        category: "Sông nước miệt vườn",
        icon: "🥥",
        lat: 10.2333,
        lng: 106.3833,
        description: "Quê hương Đồng Khởi bạt ngàn những rặng dừa xanh soi bóng dòng sông Tiền, nơi hội tụ các làng nghề làm kẹo dừa và di tích Đạo Dừa kỳ thú.",
        highlightTag: "Thủ phủ dừa Việt Nam",
        subLocations: [
      "Cồn Phụng (Di tích Đạo Dừa Nguyễn Thành Nam)",
      "Cù lao An Bình (Vườn cây ăn trái trĩu cành)",
      "Lò kẹo dừa truyền thống Mỏ Cày",
      "Vườn chôm chôm, sầu riêng Chợ Lách"
],
        activities: [
      "Đi xe ngựa trên đường làng rợp bóng dừa và nghe tiếng vó ngựa lóc cóc thanh bình",
      "Chèo xuồng ba lá len lỏi trong những con rạch nhỏ rợp bóng dừa nước mát rượi",
      "Tự tay khuấy kẹo dừa nóng hổi và gói kẹo dừa bánh tráng ăn liền",
      "Thưởng thức Cơm dừa hấp nước dừa béo bùi và tép rang nước cốt dừa đậm đà"
],
        foodSpecialties: [
      "Kẹo dừa Bến Tre",
      "Cơm trái dừa tôm rim",
      "Gỏi củ hủ dừa",
      "Bánh xèo ốc gạo Chợ Lách"
]
      },
      {
        id: "spot_vl_2",
        name: "Làng gốm đỏ Mang Thít & Chợ nổi Trà Ôn",
        category: "Di sản nghề cổ",
        icon: "🏺",
        lat: 10.2,
        lng: 106.0,
        description: "Vương quốc lò gạch gốm đỏ lớn nhất Đông Nam Á trải dài ven sông Cổ Chiên tựa như những kim tự tháp đỏ rực rỡ dưới nắng.",
        highlightTag: "Vương quốc gốm đỏ cổ tích",
        subLocations: [
      "Làng lò gạch nung Mang Thít (Di sản đương đại)",
      "Chợ nổi Trà Ôn nét văn hóa sông nước",
      "Cầu Mỹ Thuận dây văng đầu tiên của VN",
      "Chùa Tiên Châu cổ tự"
],
        activities: [
      "Đi thuyền trên sông ngắm hàng ngàn lò gạch gốm đỏ san sát soi bóng nước",
      "Hóa thân thành nghệ nhân vuốt gốm và tạo hình đất sét nung",
      "Thức dậy sớm ghé Chợ nổi Trà Ôn ăn bún bò cay bến sông",
      "Thưởng thức khoai lang tím Bình Tân nướng và cá cháy sông Hậu"
],
        foodSpecialties: [
      "Khoai lang tím Bình Tân",
      "Bánh tráng nem cù lao Lục Sĩ",
      "Cá cháy Trà Ôn",
      "Bưởi năm roi Bình Minh"
]
      }
    ]
  },
  {
    id: 'angiang',
    name: 'Tỉnh An Giang',
    province: 'An Giang & Kiên Giang',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh An Giang và tỉnh Kiên Giang',
    region: 'South',
    regionName: 'Miền Nam',
    lat: 10.3833,
    lng: 105.4167,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Hành trình từ rừng tràm Trà Sư mùa bèo cám xanh, Thất Sơn Bảy Núi huyền bí ra đến Đảo Ngọc Phú Quốc và quần đảo Nam Du thiên đường biển.',
    tags: ['Đảo Ngọc Phú Quốc', 'Rừng tràm Trà Sư', 'Miếu Bà Chúa Xứ', 'Quần đảo Nam Du'],
    bestSeason: 'Tháng 11 - 4 (Phú Quốc biển lặng)',
    touristSpots: [
      {
        id: "spot_ag_1",
        name: "Thành phố Đảo Phú Quốc (Đảo Ngọc)",
        category: "Thiên đường biển đảo",
        icon: "🏝️",
        lat: 10.2899,
        lng: 103.984,
        description: "Đảo ngọc lớn nhất Việt Nam với bãi cát trắng mịn như kem, hệ thống cáp treo vượt biển kỷ lục thế giới và các tổ hợp giải trí không ngủ.",
        highlightTag: "Đảo du lịch hàng đầu thế giới",
        subLocations: [
      "Grand World Phú Quốc (Thành phố không ngủ)",
      "Cáp treo Hòn Thơm vượt biển dài nhất thế giới",
      "Bãi Sao cát trắng mịn như kem",
      "Vinpearl Safari công viên bán hoang dã",
      "Sunset Sanato & Chợ đêm Phú Quốc"
],
        activities: [
      "Đi cáp treo 3 dây Hòn Thơm dài 7.899m ngắm quần đảo An Thới ngoạn mục",
      "Xem show diễn thực cảnh Tinh Hoa Việt Nam và Sắc Màu Venice tại Grand World",
      "Tắm biển Bãi Sao và thưởng thức gỏi cá trích tươi rói cuốn bánh tráng",
      "Ngắm hoàng hôn biểu tượng tại Sunset Sanato với các tượng điêu khắc nghệ thuật",
      "Ăn bún quậy Kiến Xây tự pha nước chấm và hải sản nướng chợ đêm Bạch Đằng"
],
        foodSpecialties: [
      "Gỏi cá trích Phú Quốc",
      "Bún quậy Kiến Xây",
      "Còi biên mai nướng muối ớt",
      "Nước mắm Phú Quốc truyền thống"
]
      },
      {
        id: "spot_ag_2",
        name: "Rừng tràm Trà Sư & Miếu Bà Chúa Xứ (An Giang)",
        category: "Sông nước & Tâm linh",
        icon: "🛶",
        lat: 10.605,
        lng: 105.05,
        description: "Lá phổi xanh nguyên sinh với thảm bèo phủ xanh mướt và trung tâm hành hương tâm linh linh thiêng bậc nhất Nam Bộ.",
        highlightTag: "Sinh thái mùa nước nổi",
        subLocations: [
      "Rừng tràm Trà Sư (Thảm bèo xanh mướt)",
      "Miếu Bà Chúa Xứ Núi Sam linh thiêng",
      "Cây cầu tre vạn bước xuyên rừng",
      "Chợ Châu Đốc (Vương quốc mắm cá miền Tây)"
],
        activities: [
      "Đi tắc ráng và xuồng chèo len lỏi qua thảm bèo xanh rừng Tràm rợp bóng chim trời",
      "Hành hương viếng Miếu Bà Chúa Xứ cầu may mắn, sức khỏe và tài lộc",
      "Đi dạo trên cầu tre dài nhất Việt Nam xuyên qua rừng tràm nguyên sinh",
      "Khám phá chợ mắm Châu Đốc nếm thử hàng trăm loại mắm cá linh, cá sặc trứ danh",
      "Thưởng thức bánh bò thốt nốt ngọt béo và bún cá Châu Đốc thơm lừng"
],
        foodSpecialties: [
      "Bún cá Châu Đốc",
      "Bánh bò thốt nốt nướng",
      "Gỏi sầu đâu khô cá sặc",
      "Mắm cá linh, cá lóc Châu Đốc"
]
      }
    ]
  },
  {
    id: 'camau',
    name: 'Tỉnh Cà Mau',
    province: 'Cà Mau & Bạc Liêu',
    provinceType: 'province',
    mergedFrom: 'Hợp nhất tỉnh Cà Mau và tỉnh Bạc Liêu',
    region: 'South',
    regionName: 'Miền Nam',
    lat: 9.1769,
    lng: 105.1524,
    image: 'https://images.unsplash.com/photo-1622308644420-a681329c0d50?auto=format&fit=crop&w=800&q=80',
    description: 'Nơi tận cùng cực Nam Tổ quốc mây trời sóng biển, rừng đước ngập mặn U Minh Hạ kết hợp giai thoại Nhà Công tử Bạc Liêu nức tiếng.',
    tags: ['Mũi Cà Mau', 'Rừng U Minh Hạ', 'Nhà Công tử Bạc Liêu', 'Điện gió'],
    bestSeason: 'Tháng 12 - 4 (Mùa khô đi lại thuận tiện)',
    touristSpots: [
      {
        id: "spot_cm_1",
        name: "Cột mốc Tọa độ Quốc gia Mũi Cà Mau & Rừng U Minh",
        category: "Cực Nam Tổ quốc",
        icon: "⚓",
        lat: 8.6167,
        lng: 104.7167,
        description: "Điểm cực Nam thiêng liêng của dải đất hình chữ S nơi ngắm mặt trời mọc ở biển Đông và lặn ở biển Tây trên cùng một dải đất.",
        highlightTag: "Cực Nam thiêng liêng Tổ quốc",
        subLocations: [
      "Mốc tọa độ quốc gia GPS 0001",
      "Cột cờ Hà Nội tại Mũi Cà Mau",
      "Vườn quốc gia Mũi Cà Mau (Rừng ngập mặn)",
      "Vườn quốc gia U Minh Hạ rừng tràm bạt ngàn",
      "Mũi Tàu biểu tượng con tàu vươn khơi"
],
        activities: [
      "Chạm tay vào Mốc tọa độ quốc gia GPS 0001 check-in điểm cực Nam đất nước",
      "Lướt vỏ lãi (xuồng cao tốc) xuyên qua rừng ngập mặn đước, vẹt nguyên sinh",
      "Trải nghiệm đi gác kèo ong lấy mật ong rừng tràm nguyên chất U Minh",
      "Thưởng thức Cua biển Cà Mau gạch son chắc ngọt nức tiếng thế giới",
      "Ăn cá thòi lòi nướng muối ớt loài cá biết leo cây kỳ thú"
],
        foodSpecialties: [
      "Cua biển Năm Căn Cà Mau",
      "Cá thòi lòi nướng muối ớt",
      "Mật ong rừng U Minh Hạ",
      "Ba khía muối Rạch Gốc"
]
      },
      {
        id: "spot_cm_2",
        name: "Dinh thự Công tử Bạc Liêu & Cánh đồng quạt gió (Bạc Liêu)",
        category: "Di sản & Check-in",
        icon: "🏛️",
        lat: 9.2833,
        lng: 105.7167,
        description: "Ngôi dinh thự xa hoa bậc nhất Nam Kỳ đầu thế kỷ XX gắn liền giai thoại công tử Bạc Liêu 'đốt tiền nấu trứng' và cánh đồng điện gió giữa biển.",
        highlightTag: "Giai thoại Nam Kỳ lục tỉnh",
        subLocations: [
      "Dinh thự Công tử Bạc Liêu (Trần Trinh Huy)",
      "Cánh đồng điện gió Bạc Liêu (Cối xay gió trên biển)",
      "Nhà hát Cao Văn Lầu hình nón lá khổng lồ",
      "Chùa Xiêm Cán kiến trúc Angkor lộng lẫy"
],
        activities: [
      "Tham quan ngôi biệt thự phong cách Pháp với nội thất dát vàng của vị công tử giàu có bậc nhất",
      "Check-in con đường đi bộ giữa biển ngắm cánh đồng 62 trụ turbine gió quay đều tăm tắp",
      "Tìm hiểu cội nguồn bản Dạ Cổ Hoài Lang tại khu lưu niệm nhạc sĩ Cao Văn Lầu",
      "Thưởng thức Bánh tằm bì Bạc Liêu béo ngậy và bún nước lèo đậm đà"
],
        foodSpecialties: [
      "Bánh tằm bì Bạc Liêu",
      "Bún bò cay Ánh Nguyệt",
      "Bánh củ cải Bạc Liêu",
      "Nhãn da bò Bạc Liêu"
]
      }
    ]
  },

  // ==========================================
  // 09 TỈNH GIỮ NGUYÊN TRẠNG THÁI
  // ==========================================
  {
    id: 'caobang',
    name: 'Tỉnh Cao Bằng',
    province: 'Cao Bằng',
    provinceType: 'province',
    mergedFrom: 'Giữ nguyên trạng thái đơn vị hành chính',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 22.6667,
    lng: 106.2500,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    description: 'Công viên địa chất toàn cầu Non nước Cao Bằng sở hữu Thác Bản Giốc thác nước tự nhiên lớn thứ tư thế giới trên đường biên giới và Hang Pác Bó.',
    tags: ['Thác Bản Giốc', 'Hang Pác Bó', 'Đèo Mẻ Pia', 'Suối Lê Nin'],
    bestSeason: 'Tháng 8 - 10 (Thác Bản Giốc mùa nước trong xanh)',
    touristSpots: [
      {
        id: "spot_cb_1",
        name: "Quần thể Thác Bản Giốc & Động Ngườm Ngao",
        category: "Kỳ quan thiên nhiên",
        icon: "🌊",
        lat: 22.8539,
        lng: 106.7236,
        description: "Thác nước tự nhiên xuyên biên giới lớn thứ 4 thế giới, dòng nước đổ cuồn cuộn trắng xóa giữa khung cảnh núi non hùng vĩ.",
        highlightTag: "Thác nước đẹp nhất Đông Nam Á",
        subLocations: [
      "Thác Bản Giốc (Tầng thác chính và thác phụ)",
      "Động Ngườm Ngao (Kiệt tác thạch nhũ vàng)",
      "Chùa Phật Tích Trúc Lâm Bản Giốc",
      "Dòng sông Quây Sơn trong xanh"
],
        activities: [
      "Đi bè tre tiến sát chân thác nước đón những làn bụi nước mát lạnh tung trắng trời",
      "Chèo thuyền Kayak hoặc chèo SUP xuôi dòng sông Quây Sơn xanh ngọc bích",
      "Khám phá Động Ngườm Ngao chiêm ngưỡng thạch nhũ hình đài sen ngược độc nhất vô nhị",
      "Lên Chùa Trúc Lâm Bản Giốc dâng hương và ngắm trọn toàn cảnh thác nước từ trên cao",
      "Thưởng thức Vịt quay 7 vị Cao Bằng da giòn bóng bẩy và cá trầm hương nướng"
],
        foodSpecialties: [
      "Vịt quay 7 vị Cao Bằng",
      "Cá trầm hương nướng sông Quây Sơn",
      "Bánh cuốn canh Cao Bằng",
      "Hạt dẻ Trùng Khánh nướng"
]
      },
      {
        id: "spot_cb_2",
        name: "Khu Di tích Lịch sử Pác Bó & Suối Lê-nin",
        category: "Di tích lịch sử",
        icon: "🏕️",
        lat: 22.981,
        lng: 106.052,
        description: "Cội nguồn cách mạng Việt Nam nơi Bác Hồ từng sống và làm việc sau 30 năm bôn ba tìm đường cứu nước, dòng suối Lê-nin xanh như ngọc.",
        highlightTag: "Di tích quốc gia đặc biệt",
        subLocations: [
      "Hang Cốc Bó (Hang Pác Bó nơi Bác Hồ ở)",
      "Suối Lê-nin làn nước trong vắt nhìn thấy đáy",
      "Núi Các Mác sừng sững",
      "Bàn đá Bác Hồ làm việc lịch sử năm 1941",
      "Cột mốc số 0 đường Hồ Chí Minh"
],
        activities: [
      "Thăm Hang Pác Bó tìm hiểu cuộc sống giản dị đầy gian lao của Bác Hồ",
      "Đi dạo ven bờ suối Lê-nin ngắm đàn cá bơi lội dưới làn nước xanh biếc tuyệt mỹ",
      "Chụp ảnh kỷ niệm bên bàn đá lịch sử và Cột mốc 108 biên giới",
      "Thưởng thức bánh áp chao nóng hổi và bánh khẩu sli giòn thơm của đồng bào Tày, Nùng"
],
        foodSpecialties: [
      "Bánh áp chao Cao Bằng",
      "Khẩu sli Nà Sặm",
      "Rau dạ hiến xào thịt bò",
      "Miến dong Phia Đén"
]
      }
    ]
  },
  {
    id: 'langson',
    name: 'Tỉnh Lạng Sơn',
    province: 'Lạng Sơn',
    provinceType: 'province',
    mergedFrom: 'Giữ nguyên trạng thái đơn vị hành chính',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 21.8533,
    lng: 106.7615,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    description: 'Cửa ngõ biên cương phía Bắc với Ải Chi Lăng lẫy lừng trang sử, Đỉnh Mẫu Sơn quanh năm mây mù và chợ cửa khẩu sầm uất.',
    tags: ['Đỉnh Mẫu Sơn', 'Ải Chi Lăng', 'Vịt quay Thất Khê', 'Động Tam Thanh'],
    bestSeason: 'Tháng 12 - 2 (Săn băng tuyết Mẫu Sơn)',
    touristSpots: [
      {
        id: "spot_ls_1",
        name: "Khu du lịch Đỉnh Mẫu Sơn tuyết phủ",
        category: "Núi cao & Băng tuyết",
        icon: "❄️",
        lat: 21.85,
        lng: 106.9167,
        description: "Đỉnh núi mờ sương cao 1.541m nơi có những biệt thự đá cổ thời Pháp, hoa cẩm tú cầu nở rộ và điểm săn băng tuyết mùa đông hiếm có.",
        highlightTag: "Thiên đường săn băng tuyết",
        subLocations: [
      "Đỉnh Mẫu Sơn 1.541m mây phủ quanh năm",
      "Quần thể biệt thự Pháp cổ kính rêu phong",
      "Bản làng người Dao đỏ Mẫu Sơn",
      "Suối Long Đầu dòng nước mát lạnh"
],
        activities: [
      "Săn băng giá và tuyết rơi kỳ thú trên đỉnh Mẫu Sơn vào những đợt rét đậm mùa đông",
      "Tắm lá thuốc người Dao đỏ thư giãn phục hồi sức khỏe",
      "Thưởng thức Ếch hương Mẫu Sơn và thịt lợn quay lá mắc mật da giòn rụm",
      "Nhâm nhi rượu Mẫu Sơn chưng cất từ men lá rừng thơm nồng ấm áp"
],
        foodSpecialties: [
      "Vịt quay Lạng Sơn mắc mật",
      "Khau nhục Lạng Sơn",
      "Rượu Mẫu Sơn",
      "Đào chuông Mẫu Sơn"
]
      },
      {
        id: "spot_ls_2",
        name: "Quần thể Động Tam Thanh, Nhị Thanh & Đền Mẫu",
        category: "Di tích & Danh thắng",
        icon: "🛕",
        lat: 21.85,
        lng: 106.75,
        description: "'Đồng Đăng có phố Kỳ Lừa, có nàng Tô Thị, có chùa Tam Thanh' - vùng danh thắng đi vào ca dao lịch sử hào hùng.",
        highlightTag: "Danh thắng ca dao Việt Nam",
        subLocations: [
      "Chùa Tam Thanh trong lòng động đá tự nhiên",
      "Tượng đá Nàng Tô Thị bồng con chờ chồng",
      "Thành nhà Mạc cổ kính trên sườn núi",
      "Chợ biên giới Tân Thanh & Chợ đêm Kỳ Lừa"
],
        activities: [
      "Đi chùa Tam Thanh vãn cảnh ngắm bài thơ khắc trên vách đá của Ngô Thì Sĩ",
      "Chiêm ngưỡng tượng đá Nàng Tô Thị biểu tượng cho lòng thủy chung son sắt",
      "Leo các bậc đá thành cổ nhà Mạc ngắm toàn cảnh thung lũng thành phố Lạng Sơn",
      "Mua sắm đặc sản hồi, quế và đồ gia dụng tại chợ cửa khẩu sầm uất"
],
        foodSpecialties: [
      "Phở chua Lạng Sơn",
      "Bánh áp chao Lạng Sơn",
      "Nem nướng Hữu Lũng",
      "Măng ớt Lạng Sơn"
]
      }
    ]
  },
  {
    id: 'laichau',
    name: 'Tỉnh Lai Châu',
    province: 'Lai Châu',
    provinceType: 'province',
    mergedFrom: 'Giữ nguyên trạng thái đơn vị hành chính',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 22.3956,
    lng: 103.4684,
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=800&q=80',
    description: 'Vùng cao Tây Bắc sở hữu đèo Ô Quý Hồ dài nhất Việt Nam, cao nguyên Sìn Hồ và bản du lịch cộng đồng Sin Suối Hồ.',
    tags: ['Đèo Ô Quý Hồ', 'Cao nguyên Sìn Hồ', 'Bạch Mộc Lương Tử'],
    bestSeason: 'Tháng 9 - 11',
    touristSpots: [
      {
        id: "spot_lcau_1",
        name: "Đèo Ô Quý Hồ (Cổng trời Lai Châu) & Cầu kính Rồng Mây",
        category: "Kỳ quan đèo dốc",
        icon: "🌉",
        lat: 22.35,
        lng: 103.75,
        description: "Vua của các con đèo hiểm trở bậc nhất Việt Nam vắt ngang dãy Hoàng Liên Sơn hùng vĩ, sở hữu cầu kính vách núi cao nhất Đông Nam Á.",
        highlightTag: "Đệ nhất đỉnh đèo Việt Nam",
        subLocations: [
      "Cầu kính Rồng Mây vươn ra vách núi",
      "Cổng trời Ô Quý Hồ điểm ngắm hoàng hôn",
      "Thác Tác Tình huyền thoại tình yêu",
      "Thung lũng Tam Đường hoa tam giác mạch"
],
        activities: [
      "Thử thách lòng can đảm bước đi trên cầu kính trong suốt nhìn xuống vực sâu 600m",
      "Săn khoảnh khắc biển mây nhuộm màu vàng cam rực rỡ lúc hoàng hôn buông xuống cổng trời",
      "Chụp ảnh kỷ niệm bên cột mốc ranh giới Lai Châu - Lào Cai trên đỉnh đèo",
      "Thưởng thức thịt trâu sấy gác bếp và trứng nướng lòng đào ấm nóng"
],
        foodSpecialties: [
      "Thịt trâu sấy gác bếp Lai Châu",
      "Pa pỉnh tộp (Cá suối nướng)",
      "Xôi tím Lai Châu",
      "Rượu ngô Sùng Phài"
]
      },
      {
        id: "spot_lcau_2",
        name: "Bản du lịch cộng đồng Sin Suối Hồ",
        category: "Bản làng sinh thái",
        icon: "🌸",
        lat: 22.5167,
        lng: 103.45,
        description: "Bản du lịch cộng đồng kiểu mẫu của người H’Mông đạt giải thưởng du lịch ASEAN với hàng vạn chậu địa lan khoe sắc và thác Trái Tim.",
        highlightTag: "Bản du lịch cộng đồng ASEAN",
        subLocations: [
      "Bản làng người H’Mông Sin Suối Hồ",
      "Thác Trái Tim giữa rừng già",
      "Chợ phiên Sin Suối Hồ ngày thứ Bảy",
      "Vườn địa lan hàng vạn chậu khoe sắc"
],
        activities: [
      "Trekking xuyên rừng trúc nguyên sinh đến Thác Trái Tim mát lạnh kỳ ảo",
      "Trải nghiệm cuộc sống mộc mạc không khói thuốc, không tệ nạn tại bản làng kiểu mẫu",
      "Tham gia chợ phiên thưởng thức bánh ngô, mèn mén và thắng cố của người Mông",
      "Tắm lá thuốc thảo dược rừng xua tan mọi mệt mỏi đường xa"
],
        foodSpecialties: [
      "Mèn mén người Mông",
      "Bánh ngô nướng",
      "Lợn cắp nách hấp sả",
      "Măng đắng xào thịt bò"
]
      }
    ]
  },
  {
    id: 'dienbien',
    name: 'Tỉnh Điện Biên',
    province: 'Điện Biên',
    provinceType: 'province',
    mergedFrom: 'Giữ nguyên trạng thái đơn vị hành chính',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 21.3869,
    lng: 103.0229,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    description: 'Vùng đất chiến công lịch sử lừng lẫy năm châu "chấn động địa cầu", ngắm hoa ban trắng nở rộ khắp sườn đồi mùa xuân.',
    tags: ['Điện Biên Phủ', 'Đồi A1', 'Hoa Ban Trắng', 'A Pa Chải'],
    bestSeason: 'Tháng 3 (Mùa hoa ban) & Tháng 5 (Kỷ niệm chiến thắng)',
    touristSpots: [
      {
        id: "spot_db_1",
        name: "Quần thể Chiến trường Điện Biên Phủ",
        category: "Di tích lịch sử lừng lẫy",
        icon: "🎖️",
        lat: 21.3833,
        lng: 103.0167,
        description: "Địa danh 'Lừng lẫy năm châu, chấn động địa cầu' lưu dấu chiến thắng lịch sử Điện Biên Phủ 1954 chấm dứt ách đô hộ thực dân.",
        highlightTag: "Chiến thắng chấn động địa cầu",
        subLocations: [
      "Đồi A1 (Cứ điểm phòng ngự kiên cố)",
      "Hầm chỉ huy tướng De Castries",
      "Bảo tàng Chiến thắng với Bức tranh Panorama khổng lồ",
      "Tượng đài Chiến thắng Điện Biên Phủ trên đồi D1",
      "Sở chỉ huy chiến dịch Mường Phăng của Đại tướng Võ Nguyên Giáp"
],
        activities: [
      "Chiêm ngưỡng bức tranh Panorama tròn tái hiện toàn cảnh 56 ngày đêm chiến dịch lịch sử",
      "Thăm hầm De Castries và hố bộc phá nghìn cân trên đỉnh Đồi A1",
      "Dâng hương viếng Nghĩa trang Liệt sĩ Đồi A1 tưởng nhớ các anh hùng liệt sĩ",
      "Lên đồi D1 ngắm tượng đài chiến thắng và ngắm trọn thung lũng Mường Thanh"
],
        foodSpecialties: [
      "Thịt trâu gác bếp Điện Biên",
      "Gạo tiến vua Điện Biên",
      "Chẩm chéo Tây Bắc",
      "Sâu chít ngâm rượu"
]
      },
      {
        id: "spot_db_2",
        name: "Cánh đồng Mường Thanh & Đèo Pha Đin",
        category: "Cảnh quan & Đèo dốc",
        icon: "🌾",
        lat: 21.35,
        lng: 103.05,
        description: "Cánh đồng lúa lớn nhất vùng Tây Bắc 'Nhất Thanh, nhì Lò, tam Than, tứ Bước' cùng Đèo Pha Đin nơi tiếp giáp giữa trời và đất.",
        highlightTag: "Cánh đồng lớn nhất Tây Bắc",
        subLocations: [
      "Cánh đồng Mường Thanh mùa lúa chín",
      "Đèo Pha Đin (Tứ đại đỉnh đèo hiểm trở)",
      "Hồ Pá Khoang xanh biếc giữa đồi hoa anh đào",
      "Cực Tây Tổ quốc A Pa Chải (Mốc ngã ba biên giới)"
],
        activities: [
      "Đạp xe giữa cánh đồng Mường Thanh vàng óng ngắm đàn cò bay lả dập dờn",
      "Chinh phục Đèo Pha Đin ngắm khung cảnh núi non trùng điệp hùng vĩ",
      "Đi thuyền du ngoạn lòng hồ Pá Khoang chiêm ngưỡng đảo hoa anh đào Nhật Bản",
      "Thưởng thức Cơm lam nếp nương hạt tròn dẻo quánh ăn kèm thịt nướng mắc khén"
],
        foodSpecialties: [
      "Cơm lam gạo nương Điện Biên",
      "Cá chép nướng úp Pa Pỉnh Tộp",
      "Nộm hoa ban rừng",
      "Măng đắng"
]
      }
    ]
  },
  {
    id: 'sonla',
    name: 'Tỉnh Sơn La',
    province: 'Sơn La',
    provinceType: 'province',
    mergedFrom: 'Giữ nguyên trạng thái đơn vị hành chính',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 21.3256,
    lng: 103.9144,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Cao nguyên Mộc Châu bốn mùa hoa trái khoe sắc, rừng thông Bản Áng thơ mộng và thác Dải Yếm đổ nước ngọc ngà.',
    tags: ['Cao nguyên Mộc Châu', 'Thác Dải Yếm', 'Đồi chè Trái Tim', 'Nhà tù Sơn La'],
    bestSeason: 'Tháng 1 - 2 (Hoa đào hoa mận) & Tháng 5 - 6 (Hái mận)',
    touristSpots: [
      {
        id: "spot_sl_1",
        name: "Cao nguyên Mộc Châu & Đồi chè Trái Tim",
        category: "Thiên đường sinh thái",
        icon: "🍃",
        lat: 20.84,
        lng: 104.65,
        description: "Thảo nguyên xanh mát bốn mùa với những đồi chè uốn lượn, thung lũng mận Nà Ka hoa nở trắng trời và rừng thông Bản Áng thơ mộng.",
        highlightTag: "Điểm đến thiên nhiên hàng đầu thế giới",
        subLocations: [
      "Đồi chè Trái Tim Mộc Sương",
      "Rừng thông Bản Áng & Hồ nước trong lành",
      "Thung lũng mận Nà Ka (Mùa hoa trắng & Hái mận đỏ)",
      "Thác Dải Yếm (Thác Nàng) 9 tầng",
      "Cầu kính Tình Yêu Mộc Châu"
],
        activities: [
      "Thuê trang phục dân tộc chụp ảnh sống ảo giữa đồi chè hình trái tim xanh ngút mắt",
      "Tự tay hái và thưởng thức mận hậu đỏ mọng tại thung lũng Nà Ka vào tháng 5",
      "Đạp xe hoặc cắm trại bên bờ hồ rừng thông Bản Áng ngắm hoàng hôn lãng mạn",
      "Thưởng thức sữa bò tươi Mộc Châu béo ngậy và bê chao giòn mềm thơm nức mũi"
],
        foodSpecialties: [
      "Bê chao Mộc Châu",
      "Cá hồi Mộc Châu",
      "Sữa tươi & Sữa chua nếp cẩm Mộc Châu",
      "Mận hậu Mộc Châu"
]
      },
      {
        id: "spot_sl_2",
        name: "Cầu kính Bạch Long (Cầu kính dài nhất thế giới)",
        category: "Kỳ quan cảm giác mạnh",
        icon: "🌉",
        lat: 20.8167,
        lng: 104.6,
        description: "Cây cầu kính đi bộ dài nhất thế giới được Guinness công nhận với chiều dài 632m vắt ngang qua hẻm núi cheo leo ngoạn mục.",
        highlightTag: "Kỷ lục Guinness thế giới",
        subLocations: [
      "Cầu kính Bạch Long vách núi",
      "Hang Chim Thần huyền bí",
      "Khu nghỉ dưỡng Mộc Châu Island",
      "Trò chơi zipline và máng trượt khô"
],
        activities: [
      "Bước đi trên mặt kính cường lực công nghệ Pháp nhìn thẳng xuống vực sâu 150m",
      "Khám phá Hang Chim Thần tự nhiên sâu trong lòng núi với hệ thống ánh sáng kỳ ảo",
      "Trải nghiệm trò chơi trượt zipline bay qua thung lũng đại ngàn",
      "Thưởng thức tiệc nướng BBQ ngoài trời giữa không gian cao nguyên mát lạnh"
],
        foodSpecialties: [
      "Thịt lợn bản nướng hạt dổi",
      "Gà đồi nướng than",
      "Cơm lam nếp Mộc Châu",
      "Xôi ngũ sắc"
]
      }
    ]
  },
  {
    id: 'quangninh',
    name: 'Tỉnh Quảng Ninh',
    province: 'Quảng Ninh',
    provinceType: 'province',
    mergedFrom: 'Giữ nguyên trạng thái đơn vị hành chính',
    region: 'North',
    regionName: 'Miền Bắc',
    lat: 20.9505,
    lng: 107.0734,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    description: 'Thủ phủ di sản kỳ quan thế giới Vịnh Hạ Long, Vịnh Bái Tử Long, đảo ngọc Cô Tô và kinh đô Phật giáo Trúc Lâm Yên Tử.',
    tags: ['Vịnh Hạ Long', 'Đảo Cô Tô', 'Chùa Yên Tử', 'Kỳ quan thế giới'],
    bestSeason: 'Tháng 4 - 6 & Tháng 9 - 11',
    touristSpots: [
      {
        id: "spot_qn_1",
        name: "Di sản Thiên nhiên Thế giới Vịnh Hạ Long",
        category: "Kỳ quan thế giới",
        icon: "⛵",
        lat: 20.9101,
        lng: 107.085,
        description: "Hàng ngàn hòn đảo đá vôi nhô lên từ làn nước xanh ngọc bích, ẩn chứa hệ thống hang động thạch nhũ hàng triệu năm tuổi.",
        highlightTag: "Kỳ quan thiên nhiên thế giới UNESCO",
        subLocations: [
      "Hang Sửng Sốt & Động Thiên Cung",
      "Đảo Ti Tốp (Tắm biển & Ngắm toàn cảnh)",
      "Hang Luồn (Chèo Kayak)",
      "Làng chài Cửa Vạn trên biển",
      "Hòn Trống Mái biểu tượng"
],
        activities: [
      "Nghỉ đêm trên du thuyền 5 sao ngắm hoàng hôn và bình minh kỳ ảo trên vịnh",
      "Chèo thuyền Kayak xuyên qua vòm đá Hang Luồn tĩnh lặng",
      "Tắm biển tại Đảo Ti Tốp và leo 400 bậc đá lên đỉnh ngắm toàn cảnh Vịnh Hạ Long 360 độ",
      "Thưởng thức tiệc hải sản tươi sống và chả mực giã tay Hạ Long giòn sần sật",
      "Khám phá Hang Sửng Sốt với lòng hang rộng lớn lộng lẫy như cung điện ngầm"
],
        foodSpecialties: [
      "Chả mực Hạ Long giã tay",
      "Sá sùng xào tỏi",
      "Sam biển nướng mỡ hành",
      "Bún bề bề Hạ Long"
]
      },
      {
        id: "spot_qn_2",
        name: "Trung tâm Du lịch Bãi Cháy & Sun World",
        category: "Giải trí & Biển",
        icon: "🎡",
        lat: 20.9575,
        lng: 107.037,
        description: "Tổ hợp vui chơi giải trí ven biển quy mô lớn bậc nhất miền Bắc với công viên nước, cáp treo vượt biển và bãi tắm cát trắng.",
        highlightTag: "Tổ hợp giải trí hàng đầu",
        subLocations: [
      "Công viên Rồng & Công viên nước Vịnh Lốc Xoáy",
      "Cáp treo Nữ Hoàng & Vòng quay Mặt Trời",
      "Bãi biển Bãi Cháy",
      "Phố cổ Bãi Cháy & Chợ đêm Hạ Long"
],
        activities: [
      "Đi cáp treo Nữ Hoàng ngắm toàn cảnh Vịnh Hạ Long và cầu Bãi Cháy từ trên cao",
      "Vui chơi sảng khoái với hàng chục máng trượt cảm giác mạnh tại công viên nước",
      "Tắm biển Bãi Cháy và tham gia mô tô nước, dù bay trên biển",
      "Dạo phố cổ Bãi Cháy ăn sữa chua trân châu Hạ Long và hải sản đêm"
],
        foodSpecialties: [
      "Sữa chua trân châu Hạ Long",
      "Bánh gật gù Tiên Yên",
      "Cù kỳ hấp sả"
]
      },
      {
        id: "spot_qn_3",
        name: "Khu Di tích Danh thắng Yên Tử",
        category: "Tâm linh & Cổ kính",
        icon: "🏯",
        lat: 21.155,
        lng: 106.721,
        description: "Cái nôi của Thiền phái Trúc Lâm do Phật hoàng Trần Nhân Tông sáng lập, nơi mây ngàn ôm ấp những ngôi chùa cổ kính.",
        highlightTag: "Thánh địa Phật giáo Việt Nam",
        subLocations: [
      "Chùa Hoa Yên cổ",
      "Chùa Đồng đỉnh núi Yên Tử cao 1.068m",
      "Khu nghỉ dưỡng Làng Nương Yên Tử",
      "Suối Giải Oan & Vườn Tháp Huệ Quang"
],
        activities: [
      "Hành hương leo đỉnh Phù Vân viếng Chùa Đồng cầu quốc thái dân an",
      "Đi cáp treo băng qua rừng trúc xanh ngút ngàn và biển mây trắng",
      "Trải nghiệm phong cách nghỉ dưỡng thiền tịnh cổ trang tại Làng Nương",
      "Thưởng thức măng trúc Yên Tử luộc chấm muối vừng thanh đạm"
],
        foodSpecialties: [
      "Măng trúc Yên Tử",
      "Chè lam Yên Tử",
      "Rượu mơ Yên Tử"
]
      }
    ]
  },
  {
    id: 'thanhhoa',
    name: 'Tỉnh Thanh Hóa',
    province: 'Thanh Hóa',
    provinceType: 'province',
    mergedFrom: 'Giữ nguyên trạng thái đơn vị hành chính',
    region: 'North',
    regionName: 'Miền Trung (Bắc Trung Bộ)',
    lat: 19.8067,
    lng: 105.7852,
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    description: 'Miền đất "Địa linh nhân kiệt" với bãi biển Sầm Sơn sôi động, Di sản văn hóa thế giới Thành nhà Hồ và khu bảo tồn thiên nhiên Pù Luông nguyên sơ.',
    tags: ['Thành nhà Hồ', 'Pù Luông', 'Biển Sầm Sơn', 'Suối cá thần'],
    bestSeason: 'Tháng 5 - 6 & Tháng 9 - 10 (Mùa lúa Pù Luông)',
    touristSpots: [
      {
        id: "spot_th_1",
        name: "Khu bảo tồn Thiên nhiên Pù Luông",
        category: "Nghỉ dưỡng & Săn mây",
        icon: "🌾",
        lat: 20.45,
        lng: 105.15,
        description: "Bản làng Thái bình yên giữa thung lũng ruộng bậc thang xanh ngát, nơi có những guồng nước khổng lồ và khu nghỉ dưỡng sinh thái trên mây.",
        highlightTag: "Bali thu nhỏ của miền Bắc",
        subLocations: [
      "Bản Đôn trung tâm ruộng bậc thang",
      "Bản Hiêu & Thác Hiêu dòng nước trong vắt",
      "Guồng nước khổng lồ bản Công",
      "Đỉnh Pù Luông cao 1.700m săn mây"
],
        activities: [
      "Bơi trong hồ bơi vô cực ngắm trọn thung lũng ruộng bậc thang Pù Luông mùa lúa chín",
      "Trekking qua những chiếc guồng nước tre khổng lồ quay đều róc rách",
      "Tắm suối nước mát lạnh dưới chân Thác Hiêu và thưởng thức vịt Cổ Lũng nướng",
      "Nghỉ ngơi trong những nếp nhà sàn truyền thống của đồng bào Thái, Mường"
],
        foodSpecialties: [
      "Vịt Cổ Lũng nướng than hoa",
      "Cơm lam Pù Luông",
      "Canh đắng lòng cá",
      "Cá suối nướng"
]
      },
      {
        id: "spot_th_2",
        name: "Di sản Thế giới Thành Nhà Hồ & Biển Sầm Sơn",
        category: "Di sản & Biển sôi động",
        icon: "🏛️",
        lat: 20.0833,
        lng: 105.6167,
        description: "Kỳ quan kiến trúc thành đá vôi độc nhất vô nhị ở Đông Nam Á trường tồn hơn 600 năm kết hợp cùng bãi biển Sầm Sơn sóng vỗ dập dờn.",
        highlightTag: "Di sản văn hóa thế giới UNESCO",
        subLocations: [
      "Thành Nhà Hồ (Cổng Nam đá vôi khổng lồ)",
      "Bãi biển Sầm Sơn nhộn nhịp",
      "Hòn Trống Mái & Đền Độc Cước linh thiêng",
      "Suối cá thần Cẩm Lương kỳ bí"
],
        activities: [
      "Chiêm ngưỡng kỹ thuật ghép các khối đá nặng hàng chục tấn không dùng vữa tại Thành Nhà Hồ",
      "Tắm biển Sầm Sơn thỏa thích với những con sóng lớn sảng khoái",
      "Thăm Suối cá thần Cẩm Lương tận mắt ngắm hàng ngàn con cá bơi lội dày đặc không ai bắt",
      "Ăn Nem chua Thanh Hóa cay nồng tỏi ớt và chả tôm nướng than giòn rụm"
],
        foodSpecialties: [
      "Nem chua Thanh Hóa",
      "Chả tôm Thanh Hóa",
      "Bánh khoái tép nồi gang",
      "Mực nhảy Sầm Sơn nướng"
]
      }
    ]
  },
  {
    id: 'nghean',
    name: 'Tỉnh Nghệ An',
    province: 'Nghệ An',
    provinceType: 'province',
    mergedFrom: 'Giữ nguyên trạng thái đơn vị hành chính',
    region: 'Central',
    regionName: 'Miền Trung',
    lat: 18.6734,
    lng: 105.6813,
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
    description: 'Quê hương Chủ tịch Hồ Chí Minh kính yêu, mảnh đất gió lào cát trắng với bãi biển Cửa Lò và vườn quốc gia Pù Mát đa dạng sinh thái.',
    tags: ['Quê Bác Làng Sen', 'Biển Cửa Lò', 'Đồi chè Thanh Chương', 'Vườn quốc gia Pù Mát'],
    bestSeason: 'Tháng 4 - 8',
    touristSpots: [
      {
        id: "spot_na_1",
        name: "Khu Di tích Quốc gia Kim Liên - Nam Đàn",
        category: "Di tích lịch sử thiêng liêng",
        icon: "🏡",
        lat: 18.6833,
        lng: 105.55,
        description: "Quê hương của Chủ tịch Hồ Chí Minh vĩ đại với mái nhà tranh mộc mạc đơn sơ dưới bóng lũy tre xanh và hàng dâm bụt đỏ thắm.",
        highlightTag: "Quê hương Bác Hồ kính yêu",
        subLocations: [
      "Làng Sen (Quê nội Bác Hồ)",
      "Làng Hoàng Trù (Quê ngoại nơi Bác cất tiếng khóc chào đời)",
      "Mộ bà Hoàng Thị Loan (Thân mẫu Bác Hồ trên núi Động Tranh)",
      "Cụm di tích Cây đa, Sân vận động Kim Liên"
],
        activities: [
      "Thăm ngôi nhà tranh mái lá đơn sơ nơi Bác Hồ sống những năm tháng ấu thơ",
      "Lắng nghe giọng thuyết minh xứ Nghệ truyền cảm xúc động về cuộc đời của Bác",
      "Dâng hoa và thắp nén hương thơm tại đền thờ Chủ tịch Hồ Chí Minh",
      "Thưởng thức Nhút Thanh Chương chấm tương Nam Đàn bùi thơm đậm đà"
],
        foodSpecialties: [
      "Nhút Thanh Chương",
      "Tương Nam Đàn",
      "Cam Xã Đoài",
      "Bánh ngào Nghệ An"
]
      },
      {
        id: "spot_na_2",
        name: "Đảo chè Thanh Chương & Bãi biển Cửa Lò",
        category: "Cảnh quan & Biển",
        icon: "🍵",
        lat: 18.7833,
        lng: 105.7833,
        description: "Những ốc đảo chè xanh ngắt hình mu rùa nhấp nhô giữa lòng hồ nước trong biếc kết hợp bãi biển Cửa Lò cát mịn thoai thoải.",
        highlightTag: "Vịnh Hạ Long trên cạn xứ Nghệ",
        subLocations: [
      "Đảo chè Thanh Chương (Ốc đảo chè xanh)",
      "Bãi biển Cửa Lò cát trắng",
      "Đảo Lan Châu ngắm toàn cảnh Cửa Lò",
      "Vườn quốc gia Pù Mát (Thác Kèm hùng vĩ)"
],
        activities: [
      "Đi thuyền máy du ngoạn quanh các ốc đảo chè xanh ngắt giữa hồ Cầu Cau thơ mộng",
      "Chụp ảnh check-in giữa những luống chè bậc thang xanh mơn mởn",
      "Tắm biển Cửa Lò và tham gia câu mực đêm trên thuyền thúng",
      "Thưởng thức Súp lươn Nghệ An cay nồng ăn kèm bánh mướt nóng hổi"
],
        foodSpecialties: [
      "Súp lươn & Cháo lươn xứ Nghệ",
      "Mực nhảy Cửa Lò hấp sả",
      "Bánh đa Đô Lương",
      "Cam bù Con Cuông"
]
      }
    ]
  },
  {
    id: 'hatinh',
    name: 'Tỉnh Hà Tĩnh',
    province: 'Hà Tĩnh',
    provinceType: 'province',
    mergedFrom: 'Giữ nguyên trạng thái đơn vị hành chính',
    region: 'Central',
    regionName: 'Miền Trung',
    lat: 18.3433,
    lng: 105.9058,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description: 'Mảnh đất địa linh giàu truyền thống với Khu di tích Ngã ba Đồng Lộc bất tử, chùa Hương Tích trên đỉnh Hồng Lĩnh và bãi biển Thiên Cầm.',
    tags: ['Ngã ba Đồng Lộc', 'Biển Thiên Cầm', 'Chùa Hương Tích', 'Hồ Kẻ Gỗ'],
    bestSeason: 'Tháng 4 - 8',
    touristSpots: [
      {
        id: "spot_ht_1",
        name: "Khu Di tích Lịch sử Ngã ba Đồng Lộc",
        category: "Di tích lịch sử anh hùng",
        icon: "🌹",
        lat: 18.2833,
        lng: 105.7333,
        description: "Tọa độ lửa trên đường Trường Sơn huyền thoại nơi 10 cô gái thanh niên xung phong tuổi mười tám đôi mươi đã anh dũng hy sinh vì Tổ quốc.",
        highlightTag: "Khúc tráng ca bất tử",
        subLocations: [
      "Khu mộ 10 nữ liệt sĩ thanh niên xung phong",
      "Hố bom định mệnh lịch sử",
      "Nhà bia tưởng niệm thanh niên xung phong toàn quốc",
      "Tháp chuông Đồng Lộc linh thiêng",
      "Bảo tàng Ngã ba Đồng Lộc"
],
        activities: [
      "Dâng hoa cúc trắng và nén hương thơm tưởng niệm 10 cô gái thanh niên xung phong",
      "Nghe câu chuyện kể xúc động rơi nước mắt về khúc tráng ca Đồng Lộc lịch sử",
      "Thỉnh chuông cầu nguyện quốc thái dân an trên ngọn Tháp chuông 7 tầng",
      "Thưởng thức Kẹo cu đơ Hà Tĩnh giòn rụm béo bùi hạt lạc ăn kèm bát chè xanh om"
],
        foodSpecialties: [
      "Kẹo Cu Đơ Hà Tĩnh",
      "Bánh bèo Hà Tĩnh",
      "Ram mướt Hà Tĩnh",
      "Hến sông La"
]
      },
      {
        id: "spot_ht_2",
        name: "Quần thể Chùa Hương Tích (Núi Hồng Lĩnh)",
        category: "Tâm linh & Danh thắng",
        icon: "🛕",
        lat: 18.5167,
        lng: 105.7833,
        description: "Ngôi chùa cổ ngự trên đỉnh núi Hồng Lĩnh 99 ngọn hùng vĩ, gắn liền tích công chúa Ba diệu thiện tu hành đắc đạo.",
        highlightTag: "Hoan Châu đệ nhất danh lam",
        subLocations: [
      "Chùa Hương Tích trên đỉnh núi Hồng Lĩnh",
      "Lòng hồ Nhà Đường thơ mộng",
      "Am Phật Bà & Động Tiên Nữ",
      "Cáp treo Hương Tích xuyên rừng thông"
],
        activities: [
      "Đi thuyền máy trên hồ Nhà Đường ngắm làn sương khói mờ ảo soi bóng rừng thông",
      "Đi cáp treo hoặc leo bậc đá viếng Chùa Hương Tích cổ tự cầu bình an",
      "Uống ngụm nước suối mát lành tại Am Phật Bà và thắp hương đảnh lễ",
      "Thưởng thức Cam bù Hương Sơn mọng nước ngọt thanh và dê núi Hồng Lĩnh"
],
        foodSpecialties: [
      "Cam bù Hương Sơn",
      "Thịt dê núi Hồng Lĩnh",
      "Bánh gai Đức Thọ",
      "Rượu nếp Can Lộc"
]
      }
    ]
  }
];

// Ẩm thực đặc sản theo các vùng miền
export const VIETNAM_SPECIALTIES: LocalSpecialty[] = [
  {
    id: 'spec_nb_1',
    name: 'Thịt dê núi Ninh Bình nướng tảng',
    destinationId: 'ninhbinh',
    destinationName: 'Tỉnh Ninh Bình',
    category: 'dish',
    categoryName: 'Món ăn đặc sản',
    description: 'Dê núi chăn thả tự nhiên trên núi đá vôi, thịt săn chắc, thơm ngọt chấm tương gừng bần đậm đà.',
    recommendedPlaces: ['Nhà hàng Đức Dê', 'Nhà hàng Thăng Long (Tràng An)'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'spec_nb_2',
    name: 'Cơm cháy chà bông chấm sốt dê',
    destinationId: 'ninhbinh',
    destinationName: 'Tỉnh Ninh Bình',
    category: 'dish',
    categoryName: 'Món ăn đặc sản',
    description: 'Cơm ép đáy xoong chiên giòn rụm màu vàng ruộm phủ chà bông thơm lừng kèm bát sốt tim cật dê béo ngậy.',
    recommendedPlaces: ['Đặc sản Cơm cháy Hoa Lư', 'Bái Đính - Tràng An'],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'spec_dn_1',
    name: 'Mì Quảng ếch & tôm thịt Đà Nẵng',
    destinationId: 'danang',
    destinationName: 'TP. Đà Nẵng',
    category: 'dish',
    categoryName: 'Món ăn đặc sản',
    description: 'Sợi mì gạo cán thủ công dẻo dai chan nước nhưn đậm đà, bánh tráng nướng giòn rụm, đậu phộng rang giã nhỏ.',
    recommendedPlaces: ['Mì Quảng Bà Mua', 'Mì Quảng Ếch Bếp Trang'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'spec_dn_2',
    name: 'Bánh tráng cuốn thịt heo hai đầu da',
    destinationId: 'danang',
    destinationName: 'TP. Đà Nẵng',
    category: 'dish',
    categoryName: 'Món ăn đặc sản',
    description: 'Thịt luộc điêu luyện giữ hai đầu mỡ bì đều đặn cuộn cùng rau rừng tươi rói chấm mắm nêm xứ Quảng cay nồng.',
    recommendedPlaces: ['Quán Trần (Lê Duẩn)', 'Quán Mậu (Đỗ Thúc Tịnh)'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'spec_hue_1',
    name: 'Bún bò Huế truyền thống sả ruốc',
    destinationId: 'hue',
    destinationName: 'TP. Huế',
    category: 'dish',
    categoryName: 'Món ăn đặc sản',
    description: 'Nước dùng hầm xương bò dậy mùi thơm của sả tươi và mắm ruốc cung đình, sợi bún to ăn kèm chả cua thơm mềm.',
    recommendedPlaces: ['Bún bò Mụ Rơi (Nguyễn Du)', 'Bún bò Bà Tuyết'],
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'spec_hn_1',
    name: 'Phở bò Hà Nội gia truyền',
    destinationId: 'hanoi',
    destinationName: 'TP. Hà Nội',
    category: 'dish',
    categoryName: 'Món ăn đặc sản',
    description: 'Bát phở thơm ngát quế hồi gừng nướng, nước dùng trong vắt ngọt thanh từ xương tủy bò hầm kỹ nhiều giờ.',
    recommendedPlaces: ['Phở Gia Truyền Bát Đàn', 'Phở Thìn Lò Đúc'],
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'spec_ld_1',
    name: 'Lẩu gà lá é Tao Ngộ Đà Lạt',
    destinationId: 'lamdong',
    destinationName: 'Tỉnh Lâm Đồng',
    category: 'dish',
    categoryName: 'Món ăn đặc sản',
    description: 'Gà ta thả đồi dai ngọt nấu cùng măng le cay nồng và lá é the the rất hợp với không khí se lạnh của cao nguyên.',
    recommendedPlaces: ['Lẩu gà lá é Tao Ngộ (Đường 3/4)', 'Quán 668'],
    image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'spec_cb_1',
    name: 'Bánh cuốn canh Cao Bằng & Vịt quay 7 vị',
    destinationId: 'caobang',
    destinationName: 'Tỉnh Cao Bằng',
    category: 'dish',
    categoryName: 'Món ăn đặc sản',
    description: 'Bánh cuốn bột gạo nương mềm mượt ăn cùng bát nước dùng ninh xương ngọt lịm kèm chả giò và trứng lòng đào.',
    recommendedPlaces: ['Quán bánh cuốn Bà Coong (TP. Cao Bằng)'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80'
  }
];

export const VIETNAM_ATTRACTIONS: AttractionItem[] = [
  {
    id: 'att_nb_trangan',
    destinationId: 'ninhbinh',
    destinationName: 'Tỉnh Ninh Bình',
    name: 'Quần thể danh thắng Tràng An',
    category: 'nature',
    categoryName: 'Di sản thế giới kép',
    description: 'Chèo thuyền nan lướt nhẹ qua những thung nước trong xanh như ngọc bích và xuyên qua các hang đá vôi kỳ vĩ.',
    estimatedDuration: '3 - 4 giờ',
    recommendedTime: 'Buổi sáng sớm (7:30 - 11:00)',
    lat: 20.2541,
    lng: 105.9084,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'att_cb_pacbo',
    destinationId: 'caobang',
    destinationName: 'Tỉnh Cao Bằng',
    name: 'Di tích Hang Pác Bó & Suối Lê-nin',
    category: 'heritage',
    categoryName: 'Di tích lịch sử quốc gia',
    description: 'Nơi Bác Hồ từng làm việc bên bàn đá chông chênh, dòng suối Lê-nin trong xanh thấu đáy rợp bóng cây xanh mát.',
    estimatedDuration: '2.5 giờ',
    recommendedTime: 'Buổi sáng mát mẻ',
    lat: 22.9810,
    lng: 106.0520,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'att_lc_sapa',
    destinationId: 'laocai',
    destinationName: 'Tỉnh Lào Cai',
    name: 'Thị trấn Sa Pa & Bản Cát Cát',
    category: 'nature',
    categoryName: 'Thị trấn sương mù',
    description: 'Bản làng dân tộc Mông bình yên bên thung lũng Mường Hoa, dòng suối Tiên Sa róc rách và cối xay nước khổng lồ.',
    estimatedDuration: '3 giờ',
    recommendedTime: 'Buổi chiều ngắm hoàng hôn',
    lat: 22.3364,
    lng: 103.8438,
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'att_dn_bana',
    destinationId: 'danang',
    destinationName: 'TP. Đà Nẵng',
    name: 'Bà Nà Hills & Cầu Vàng',
    category: 'entertainment',
    categoryName: 'Kỳ quan kiến trúc',
    description: 'Cây cầu Vàng vắt ngang lưng chừng trời trên đôi bàn tay khổng lồ phủ rêu phong giữa biển mây bồng bềnh.',
    estimatedDuration: '5 giờ',
    recommendedTime: 'Sáng sớm lúc 8:00',
    lat: 15.9989,
    lng: 107.9880,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'
  }
];

export const VIETNAM_CULTURE: CulturalHighlight[] = [
  {
    id: 'cult_1',
    destinationId: 'ninhbinh',
    destinationName: 'Tỉnh Ninh Bình',
    title: 'Lễ hội truyền thống Cố đô Hoa Lư',
    type: 'festival',
    typeName: 'Lễ hội văn hóa',
    description: 'Tưởng nhớ công đức vua Đinh Tiên Hoàng và vua Lê Đại Hành với nghi thức rước nước sông Hoàng Long trang trọng.',
    periodOrTime: 'Tháng 3 Âm lịch'
  },
  {
    id: 'cult_2',
    destinationId: 'danang',
    destinationName: 'TP. Đà Nẵng',
    title: 'Lễ hội Đèn lồng Phố cổ Hội An',
    type: 'festival',
    typeName: 'Di sản phi vật thể',
    description: 'Vào đêm rằm 14 âm lịch hàng tháng, cả phố cổ tắt đèn điện và thắp sáng hàng vạn chiếc đèn lồng huyền ảo.',
    periodOrTime: 'Đêm rằm 14 Âm lịch hàng tháng'
  }
];
