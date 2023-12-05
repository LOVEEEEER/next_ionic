import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Layout = ({ children, title }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
};

export default Layout;
