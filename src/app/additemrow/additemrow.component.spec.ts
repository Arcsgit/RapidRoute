import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditemrowComponent } from './additemrow.component';

describe('AdditemrowComponent', () => {
  let component: AdditemrowComponent;
  let fixture: ComponentFixture<AdditemrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditemrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditemrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
