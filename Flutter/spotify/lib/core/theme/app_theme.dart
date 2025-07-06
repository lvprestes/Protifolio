import 'package:flutter/material.dart';
import 'package:spotify/core/theme/app_colors.dart';

class AppTheme {
  static InputDecorationTheme _inputDecorationTheme(Color borderColor, Color hintColor) {
    return InputDecorationTheme(
      filled: true,
      fillColor: Colors.transparent,
      hintStyle: TextStyle(color: hintColor, fontWeight: FontWeight.w500),
      contentPadding: const EdgeInsets.all(30),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(30),
        borderSide: BorderSide(color: borderColor, width: 0.4),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(30),
        borderSide: BorderSide(color: borderColor, width: 0.4),
      ),
    );
  }

  static final ElevatedButtonThemeData _elevatedButtonTheme = ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: AppColors.primary,
      elevation: 0,
      textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
    ),
  );

  static ThemeData _baseTheme(
    Brightness brightness,
    Color scaffoldBackgroundColor,
    Color borderColor,
    Color hintColor,
  ) {
    return ThemeData(
      fontFamily: 'Satoshi',
      inputDecorationTheme: _inputDecorationTheme(borderColor, hintColor),
      primaryColor: AppColors.primary,
      scaffoldBackgroundColor: scaffoldBackgroundColor,
      brightness: brightness,
      elevatedButtonTheme: _elevatedButtonTheme,
    );
  }

  static final lightTheme = _baseTheme(
    Brightness.light,
    AppColors.lightBackground,
    Colors.black,
    const Color(0xff383838),
  );

  static final darkTheme = _baseTheme(
    Brightness.dark,
    AppColors.darkBackground,
    Colors.white,
    const Color(0xffa7a7a7),
  );
}
