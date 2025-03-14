import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpathComponent } from './addpath.component';

describe('AddpathComponent', () => {
  let component: AddpathComponent;
  let fixture: ComponentFixture<AddpathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpathComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddpathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
