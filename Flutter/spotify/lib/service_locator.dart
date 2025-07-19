import 'package:get_it/get_it.dart';
import 'package:spotify/data/repository/auth/auth_repository_impl.dart';
import 'package:spotify/data/sources/auth/auth_firebase_service.dart';
import 'package:spotify/domain/repository/auth/auth.dart';
import 'package:spotify/domain/usecases/auth/signin.dart';
import 'package:spotify/domain/usecases/auth/signup.dart';
import 'package:spotify/domain/usecases/song/get_news_songs.dart';
import 'package:spotify/domain/usecases/song/get_play_list.dart';

import 'data/repository/song/song_repository_impl.dart';
import 'data/sources/song/song_firebase_service.dart';
import 'domain/repository/song/song.dart';

final sl = GetIt.instance;

Future<void> initializeDependencies() async {
  //SERVICES
  sl.registerSingleton<AuthFirebaseService>(AuthFirebaseServiceImpl());
  sl.registerSingleton<SongFirebaseService>(SongFirebaseServiceImpl());

  //REPOSITORIES
  sl.registerSingleton<AuthRepository>(AuthRepositoryImpl());
  sl.registerSingleton<SongRepository>(SongRepositoryImpl());

  //SINGIN & SINGNUP
  sl.registerSingleton<SignUpUseCase>(SignUpUseCase());
  sl.registerSingleton<SignInUseCase>(SignInUseCase());

  //GET
  sl.registerSingleton<GetNewsSongsUseCase>(GetNewsSongsUseCase());
  sl.registerSingleton<GetPlayListUseCase>(GetPlayListUseCase());
}
