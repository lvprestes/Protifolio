import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:spotify/common/helpers/is_dark_mode.dart';
import 'package:spotify/core/assets/app_images.dart';
import 'package:spotify/core/theme/app_colors.dart';

import '../../../common/widgets/appbar/app_bar.dart';
import '../../../core/assets/app_vectors.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  Widget _homeTopCard(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final isTablet = screenWidth >= 600;
    final cardWidth = isTablet ? screenWidth * 0.7 : 400.0;
    final cardHeight = isTablet ? 260.0 : 220.0;
    final imagePaddingRight = isTablet ? 80.0 : 60.0;

    return Center(
      child: SizedBox(
        height: cardHeight,
        width: cardWidth,
        child: Stack(
          children: [
            Align(alignment: Alignment.bottomCenter, child: SvgPicture.asset(AppVectors.homeTopCard, width: cardWidth, fit: BoxFit.cover)),
            Align(
              alignment: Alignment.bottomRight,
              child: Padding(padding: EdgeInsets.only(right: imagePaddingRight), child: Image.asset(AppImages.homeArtist)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _tabs(BuildContext context) {
    final isTablet = MediaQuery.of(context).size.width >= 600;

    return TabBar(
      controller: _tabController,
      isScrollable: !isTablet, // Tabs fixas se tiver espaço suficiente
      labelColor: context.isDarkMode ? Colors.white : Colors.black,
      indicatorColor: AppColors.primary,
      padding: EdgeInsets.symmetric(vertical: isTablet ? 48 : 40, horizontal: isTablet ? 32 : 16),
      labelPadding: EdgeInsets.symmetric(horizontal: isTablet ? 24 : 12),
      tabs: const [
        Text('News', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 18)),
        Text('Videos', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 18)),
        Text('Artists', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 18)),
        Text('Podcasts', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 18)),
      ],
    );
  }

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: BasicAppbar(hideBack: true, title: SvgPicture.asset(AppVectors.logo, height: 40, width: 40)),
      body: SingleChildScrollView(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [_homeTopCard(context), _tabs(context)])),
    );
  }
}
