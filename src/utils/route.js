import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import Exporter from '../ExportersPanel/partials/Exporters';
import Notification_page from '../ExportersPanel/partials/Notification_page';
import UploadDocs_page from '../ExportersPanel/partials/UploadDocs_page';
import Importer from '../ImportersPanel/partials/Importers';
import Notification_importer from '../ImportersPanel/partials/Notification_importer';
import Bank from '../BanksPanel/partials/Bank';
import Notification_bank from '../BanksPanel/partials/Notification_bank';
import Shipping from '../ShippingsPanel/partials/Shipping';
import PortAuthority from '../PortAuthorityPanel/partials/PortAuthority';
import Custom from '../CustomsPanel/partials/Custom';
import ApproveQuotation_page from '../ImportersPanel/partials/ApproveQuotation_page';
import ApprovePO_page from '../ExportersPanel/partials/ApprovePO_page';
import ApproveQuotation_Custom from '../CustomsPanel/partials/ApproveQuotation_Custom';
import ApproveQuotation_Port from '../PortAuthorityPanel/partials/ApproveQuotation_Port';

import Login from '../Login';

const AppRouter = () => (
    <BrowserRouter>
        <div>
        
            <Switch>
                <Route path="/" component={Login} exact={true} />
            
                <Route path="/exportersPanel" component={Exporter} exact={true} />
                <Route path="/exportersPanel/notifications" component={Notification_page}/>
                <Route path="/exportersPanel/uploadDocs" component={UploadDocs_page} />
                <Route path="/exportersPanel/ApprovePurchaseOrder/:id" component={ApprovePO_page} />
                
                <Route path="/importersPanel" component={Importer} exact={true} />
                <Route path="/importersPanel/notifications" component={Notification_importer} />
                <Route path="/importersPanel/ApproveQuotation/:id" component={ApproveQuotation_page}  />
                
                <Route path="/banksPanel" component={Bank} exact={true} />
                <Route path="/banksPanel/notifications" component={Notification_bank} />

                <Route path="/shippingsPanel" component={Shipping} exact={true} />

                <Route path="/portAuthorityPanel" component={PortAuthority} exact={true}/>
                <Route path="/portAuthorityPanel/ApproveQuotation/:id" component={ApproveQuotation_Port} />
                

                <Route path="/customsPanel" component={Custom} exact={true}/>
                <Route path="/customsPanel/ApproveQuotation/:id" component={ApproveQuotation_Custom} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;