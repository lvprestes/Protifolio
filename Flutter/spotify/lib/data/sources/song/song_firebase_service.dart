import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:dartz/dartz.dart';
import 'package:spotify/domain/entities/song/song.dart';

import '../../models/song/song.dart';

abstract class SongFirebaseService {
  Future<Either> getNewSongs();
}

class SongFirebaseServiceImpl implements SongFirebaseService {
  @override
  Future<Either> getNewSongs() async {
    try {
      List<SongEntity> songs = [];
      var data = await FirebaseFirestore.instance.collection('songs').orderBy('releaseDate', descending: true).limit(3).get();
      for (var element in data.docs) {
        var songModel = SongModel.fromJson(element.data());
        songs.add(songModel.toEntity());
      }
      return Right(songs);
    } catch (e) {
      return const Left('An error ocurred, please try again');
    }
  }
}
