import 'package:dartz/dartz.dart';
import 'package:spotify/core/usecase/usecase.dart';
import 'package:spotify/data/models/auth/create_user_req.dart';

import '../../../service_locator.dart';
import '../../repository/auth/auth.dart';

class SignUpUseCase implements UseCase<Either, CreateUserReq> {
  @override
  Future<Either> call({CreateUserReq? params}) async {
    return await sl<AuthRepository>().signup(params!);
  }
}
