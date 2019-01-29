package devops_movie_db;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.*;

import java.io.FileInputStream;

@SuppressWarnings("ALL")
public class Database {
    public void connectDatabase(){
        String url = "https://dmdb-726d1.firebaseio.com";
        try {
            System.out.println("---- Begin ----");
            FileInputStream serviceAccount =
                    new FileInputStream("ressources\\dmdb-726d1-firebase-adminsdk-kppj6-af6091e5e8.json");
            System.out.println("---- options ----");
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl(url)
                    .build();
            System.out.println("---- Initialize ----");
            FirebaseApp app = FirebaseApp.initializeApp(options);
            System.out.println("---- GetInstance ----");
            FirebaseDatabase database = FirebaseDatabase.getInstance(app,url);
            System.out.println("---- Reference ----");
            DatabaseReference ref = database.getReference("/Films");
            System.out.println("---- ChildEventListener ----");
            System.out.println("Root : " + ref.child("6YL5DiUEBNPWkNzoO5DR").getKey());
            ref.addChildEventListener(new ChildEventListener() {
                @Override
                public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                    //Post newPost = dataSnapshot.getValue(Post.class);
                    System.out.println("aaaaah");
                    System.out.println("Tests : " + dataSnapshot.getValue());
                    System.out.println("Child : " + dataSnapshot.getKey());
                }

                @Override
                public void onChildChanged(DataSnapshot dataSnapshot, String s) {

                }

                @Override
                public void onChildRemoved(DataSnapshot dataSnapshot) {

                }

                @Override
                public void onChildMoved(DataSnapshot dataSnapshot, String s) {

                }

                @Override
                public void onCancelled(DatabaseError databaseError) {
                    System.out.println("The read failed: " + databaseError.getCode());
                }
            });
        } catch(Exception exception) {
            exception.printStackTrace();
        }

    }
}
