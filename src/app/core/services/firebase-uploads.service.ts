import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class FirebaseUploadsService {

  ruta: string;

  constructor(private http: HttpClient) { }

  subirArchivo(file: File, ruta: string){
    const storage = getStorage();
    const imgRef = ref(storage,ruta);
    const uploadTask = uploadBytesResumable(imgRef, file);
    var url: string = '';

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('El porcentaje de subida es de ' + progress + '%');
        switch (snapshot.state) {
          case 'paused':
            console.log('La carga se ha pausado');
            break;
          case 'running':
            console.log('La carga esta activa');
            break;
        }
      },
      (error) => {
        Swal.fire(
          'Error',
          'No se pudo cargar el archivo',
          'error'
        )
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          localStorage.setItem('ruta', downloadURL);
        });
      }
    );
  }

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }
}
