import { AfterViewInit, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subject } from 'rxjs';

/**
 * BasePage defines the common behavior of the app
 */

export abstract class BasePage implements OnDestroy, AfterViewInit {
    /**
     * Activated routes sercvice
     */
    protected activatedRoute: ActivatedRoute;

    /**
     * Component Destroyed Seuject
     */
    protected componentDestroyed$: Subject<string>;

    constructor(protected injector: Injector) {
        this.activatedRoute = this.injector.get(ActivatedRoute);
        this.componentDestroyed$ = new Subject();
    }

    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }

    ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.unsubscribe();
    }
}