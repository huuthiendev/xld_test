import { Router } from 'express';
import { AppRoute } from './interfaces/app_route.interface';
import { WalletController } from './controllers/wallet.controller';

export class AppRouting {
  constructor(private route: Router) {
    this.route = route;

    // Add the routing classes.
    this.addRoute(new WalletController());
  }

  private addRoute(appRoute: AppRoute) {
    this.route.use(appRoute.route, appRoute.router);
  }
}