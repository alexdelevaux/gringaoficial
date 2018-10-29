import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGringaComponent } from './home-gringa.component';

describe('HomeGringaComponent', () => {
  let component: HomeGringaComponent;
  let fixture: ComponentFixture<HomeGringaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGringaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGringaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
