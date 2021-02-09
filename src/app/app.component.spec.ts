import { PhotoUploaderModule } from '@test21-core/photo-uploader';
import { render, RenderResult } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

async function renderComponent(): Promise<any> {
  return render(AppComponent, {
    excludeComponentDeclaration: true,
    imports: [AppModule, PhotoUploaderModule]
  });
}

describe('AppComponent', () => {
  let renderResult: RenderResult<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    renderResult = await renderComponent();
    component = renderResult.fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(renderResult).toBeTruthy();
  });

  describe('hellowWorld', () => {
    test('should return something', () => {
      const mockedFunction = jest.spyOn(component, 'helloWorld');
      component.helloWorld(2);
      expect(mockedFunction).toHaveReturnedWith(2);
      expect(mockedFunction).toHaveBeenCalled();
    });
  });
});
