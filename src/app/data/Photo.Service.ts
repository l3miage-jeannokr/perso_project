import { Injectable, signal } from "@angular/core";
import { Photo } from "./Photo";

@Injectable({
        providedIn: 'root'
    })

export class PhotoService {
    private readonly _PhotosList= signal<readonly Photo[]>([
        
        {
            PhotoURL: 'https://lh3.googleusercontent.com/pw/AP1GczM7z3ITs3LdQoYlUPjBUyQh9fyuVe0aqhtMbnIKLkn5TMteu9S2fdML8VRoXKioUzR_eBbqp09Z_wgb9ut5oMEzdY9lT3nPvPR73dLVNnXpYl-BHVEI2hwXrwEHBBOtSvnHxc_9S7W5FGBux0mS7Eg7E9goIJTic-10RN3qyiyfTDKZ2NV6KtxTTRgyAw2GwtUvNxJhQwuGVFDLswxjY3zjvjktrfkiWTHfERBQlAd5T4pbsr6462lyU-1EKzG1LA9W83nAKrICazMPk-NlLFVI5j4pDu3Dg-zF66FWyzVWn60CvOLbwlySFPAWlSsBI9Fqn1rdLkBeUozNR4tMw9-5lh795fO78vwrQNKek21Wi03vNZNSz3DBx2IWUZtgW0uU3gVIm7RUMufckeOtVSBizOc-soKilFGeahx82XeYrogBVvBez-0FAbJ15aIssoPJfDsBWCk7oSBGw9txgedMLXxdG2FyeBiFgP8_cn4JlryNxNyYkeOUETBbREMBG0_dNFf4IQPB4K-p7tfVpa_Ts-KL_2X9jZ8wkGijS46SMZfZnaEHuTg8qFzshxBfM8xqDOP9_Q9nQIofcO6JFxqPNIBN963MTs0fePBoyK0FumpfwiVCkAMx44T3bR8BRU1vtwa3QjOsHTUJLYDBWk1il87SYpy-X_bWDVigyftfe3vxJ6uRHgY05ym_Jsaa_HrZqDOtBTZ1RWL2ZJe29CVLu8gc11VbNpplfWUqsxUGTUVTwMBdeSSJ8KUpM5KxToegm1tqGh49Q80ZFip6ax1F_4BUKod1ODX-ZUW86BLKx8PfQlJZL2_VpQdt4LQZu_dU7SEY07cimgmcgsGpBu5wyoVJzTnn_4xl2YSniYPnktBF5qsHGddWiGqLCw0uqsQjyZsMSUdns_Pa_tj2NSYO=w810-h1080-s-no?authuser=0',
            PhotoDescription: 'Photo1',
            PhotoDate: new Date(2021, 1, 1)
        },
        {
            PhotoURL: 'https://lh3.googleusercontent.com/pw/AP1GczMg9bu68N3UvHmpHGAT_tZLeMq-K2nl42zZ2FgyJOlcd_qg4Dnh5bhRjJfUJQ2JUT4ObNuhhXHEuuxchn41Jmp2M1v1USLbbMMQZMcRPNE4NXdthv9HiRFVoJz-NEVotUdgd11XalUj7YzzGs91KYjR1JWkggjMGxtkBwhSse36Yj4JRZGSqlk2THwzChWFPFWteK1-loa9YzGwkw6bo98Wq3zDfh1Xm_QZwf1oK8YbDilBXiBFuQwhowYQ85dnY8IdW3mL9UO42R7B0IDQtHyLTURDz9l5WzdzTIZlQE-kARJrferE-ivHkGqu8MbehJNvI7wOx7TOMYx88AOmd8NhunMQ14BlNuHXoQYQImjlsBAResrKKiQK_shi6hwNxpMuVL2ruqblowuRpsZPIBO1xQmkeci03et-jZJBtBv44YaTkibGrQN0SbBU_PsPI2URiwoe0i0DRF4PeoXzmtilOHnSEi-n3e0EgohxmjnJKq1ojtg82oLZNxey3pdogGN9qfEQutIi6KEhKMb7KYHslXJTJGEFhebkxTNrD4XveZufmnk3usawaS8aaE0rLdegQVLymNeb2OFXESfYQgOiDlXiQWMmZQU6g9feZq7G1aEUURSsLCjt1IrJP5H55jsbFRNMHO4IRJ_LVJKien7huHUtKFOup_GKuNGmq35Ais8Oaz90E-v196APKrkGhnGgcBeo0AhdWVbEg3ThPzG2Eeo3vsMiFriZn3vSJvNpphvzBxKFu9YeDSkgo6SzoiKelyyiz-RNTXNtZDwHvusqTjoRejH9o0_8GmgtTg8Fo3VWVaYTrdlUkMnGINYkbMpGTMQwHDGs2BWH2jfa2er-MuohP4Nx4eMqkG2QxNCxByS3lxy4kw9kuTZSCYXx_EXeTRf6w0QHjBllzcRJDKpc=w810-h1080-s-no?authuser=0',
            PhotoDescription: 'Photo2',
            PhotoDate: new Date(2021, 2, 1)
        },
        {
            PhotoURL: '/images/im1.jpg',
            PhotoDescription: 'Photo3',
            PhotoDate: new Date(2021, 3, 1)
        },
        {
            PhotoURL: '/images/im2.jpg',
            PhotoDescription: 'Photo4',
            PhotoDate: new Date(2021, 4, 1)
        },

        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo5',
            PhotoDate: new Date(2021, 1, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo6',
            PhotoDate: new Date(2021, 2, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo7',
            PhotoDate: new Date(2021, 3, 1)
        },
        {
            PhotoURL: 'src/app/images/im1.jpg',
            PhotoDescription: 'Photo8',
            PhotoDate: new Date(2021, 4, 1)
        },

        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo9',
            PhotoDate: new Date(2021, 1, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo10',
            PhotoDate: new Date(2021, 2, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo11',
            PhotoDate: new Date(2021, 3, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo12',
            PhotoDate: new Date(2021, 4, 1)
        },
        
    ]);

    public readonly photosList = this._PhotosList.asReadonly();
}