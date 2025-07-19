import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:spotify/common/widgets/appbar/app_bar.dart';
import 'package:spotify/common/widgets/button/basic_app_button.dart';
import 'package:spotify/core/configs/assets/app_vectors.dart';
import 'package:spotify/core/configs/theme/app_colors.dart';
import 'package:spotify/data/models/auth/signin_user_req.dart';
import 'package:spotify/presentation/auth/pages/signup.dart';

import '../../../domain/usecases/auth/signin.dart' show SignInUseCase;
import '../../../service_locator.dart';
import '../../home/pages/home.dart';

class SigninPage extends StatelessWidget {
  SigninPage({super.key});

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  Widget _registerText() {
    return const Text('Sign In', textAlign: TextAlign.center, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25));
  }

  Widget _emailField(BuildContext context) {
    return TextField(
      controller: _emailController,
      decoration: const InputDecoration(hintText: 'Enter Email').applyDefaults(Theme.of(context).inputDecorationTheme),
    );
  }

  Widget _passwordField(BuildContext context) {
    return TextField(
      controller: _passwordController,
      obscureText: true,
      decoration: const InputDecoration(hintText: 'Password').applyDefaults(Theme.of(context).inputDecorationTheme),
    );
  }

  Widget _signupText(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 30),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text('Not A Member? ', style: TextStyle(fontWeight: FontWeight.w500, fontSize: 14)),
          TextButton(
            onPressed: () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (BuildContext context) => SignupPage())),
            child: const Text('Register Now', style: TextStyle(color: AppColors.primary)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: BasicAppbar(title: SvgPicture.asset(AppVectors.logo, height: 40, width: 40)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(vertical: 50, horizontal: 30),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            _registerText(),
            const SizedBox(height: 50),
            _emailField(context),
            const SizedBox(height: 20),
            _passwordField(context),
            const SizedBox(height: 30),
            BasicAppButton(
              onPressed: () async {
                var result = await sl<SignInUseCase>().call(
                  params: SigninUserReq(email: _emailController.text.toString().trim(), password: _passwordController.text.toString()),
                );
                result.fold(
                  (l) {
                    var snackbar = SnackBar(content: Text(l), behavior: SnackBarBehavior.floating);
                    ScaffoldMessenger.of(context).showSnackBar(snackbar);
                  },
                  (r) {
                    Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (BuildContext context) => const HomePage()), (route) => false);
                  },
                );
              },
              title: 'Sign In',
            ),
          ],
        ),
      ),
      bottomNavigationBar: _signupText(context),
    );
  }
}
