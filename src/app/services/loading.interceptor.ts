import { HttpInterceptorFn } from "@angular/common/http";
import { LoadingService } from "../components/loading/loading.service";
import { inject } from "@angular/core";
import { finalize } from "rxjs";
import { SkipLoading } from "../components/loading/skip-loading.components";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.context.get(SkipLoading)) {
        return next(req);
    }

    const loadingService = inject(LoadingService);
    loadingService.loadingOn();

    // Intercept the request and handle the response
    return next(req).pipe(
        finalize(() => {
            loadingService.loadingOff();
        })
    );
}