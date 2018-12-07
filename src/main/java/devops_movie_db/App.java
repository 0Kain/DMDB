package devops_movie_db;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
        Database db = new Database();
        db.connectDatabase();
    }
}
