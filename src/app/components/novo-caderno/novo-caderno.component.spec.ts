import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoCadernoComponent } from './novo-caderno.component';

describe('NovoCadernoComponent', () => {
  let component: NovoCadernoComponent;
  let fixture: ComponentFixture<NovoCadernoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoCadernoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoCadernoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
