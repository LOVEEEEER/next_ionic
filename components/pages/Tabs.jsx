import { Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { addCircle, list } from 'ionicons/icons';

import CreateProduct from './CreateProduct/CreateProduct';
import Products from './Products';
import ProductItem from './ProductItem';
import Layout from '../layout/layout';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route
          path="/create"
          render={() => (
            <Layout title="Create product">
              <CreateProduct />
            </Layout>
          )}
          exact={true}
        />
        <Route
          path="/products"
          render={() => (
            <Layout title="Products">
              <Products />
            </Layout>
          )}
          exact={true}
        />
        <Route
          path="/products/:listId"
          render={() => (
            <Layout title="Product">
              <ProductItem />
            </Layout>
          )}
          exact={true}
        />
        {/* <Route path="/" render={() => <Redirect to="/create" />} exact={true} /> */}
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab2" href="/products">
          <IonIcon icon={list} />
          <IonLabel>Products</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab1" href="/create">
          <IonIcon icon={addCircle} />
          <IonLabel>Create</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
