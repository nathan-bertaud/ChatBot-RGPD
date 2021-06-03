import { newE2EPage } from '@stencil/core/testing';

describe('dpliance-chatbot', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dpliance-chatbot></dpliance-chatbot>');

    const element = await page.find('dpliance-chatbot');
    expect(element).toHaveClass('hydrated');
  });
});
