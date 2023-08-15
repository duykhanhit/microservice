import { HttpService } from '@nestjs/axios';
import { Logger, OnApplicationBootstrap } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

export class KongGatewayModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    const service = 'user-service';
    const path = '/api/users';
    const httpService = new HttpService();
    const logger = new Logger(KongGatewayModule.name);

    let serviceExist = null;
    try {
      serviceExist = await firstValueFrom(
        httpService.get(`http://kong:8001/services/${service}`).pipe(
          catchError((error: AxiosError) => {
            throw error.message;
          }),
        ),
      );
    } catch (error) {}

    let serviceId = serviceExist?.data?.id;

    if (!serviceId) {
      const { data } = await firstValueFrom(
        httpService
          .post('http://kong:8001/services/', {
            name: service,
            url: `http://${service}:3000/`,
          })
          .pipe(
            catchError((error: AxiosError) => {
              logger.error(error.message);
              throw 'An error happened!';
            }),
          ),
      );

      serviceId = data.id;
    }

    logger.log(
      `KONG Service: Register success ${service} with id ${serviceId}`,
    );

    let routeExist = null;

    try {
      routeExist = await firstValueFrom(
        httpService
          .get(`http://kong:8001/services/${service}/routes/${service}`)
          .pipe(
            catchError((error: AxiosError) => {
              throw error.message;
            }),
          ),
      );
    } catch (error) {}

    let routeId = routeExist?.data?.id;

    if (!routeId) {
      const { data } = await firstValueFrom(
        httpService
          .post(`http://kong:8001/services/${service}/routes`, {
            name: service,
            paths: [path],
            strip_path: false,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
          })
          .pipe(
            catchError((error: AxiosError) => {
              logger.error(error.message);
              throw error.message;
            }),
          ),
      );

      routeId = data.id;
    }

    logger.log(`KONG Route: Register success ${service} with id ${routeId}`);
  }
}
