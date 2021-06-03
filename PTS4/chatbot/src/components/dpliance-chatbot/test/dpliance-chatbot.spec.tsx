import { newSpecPage } from '@stencil/core/testing';
import { DplianceChatbot } from '../dpliance-chatbot';

describe('dpliance-chatbot', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DplianceChatbot],
      html: `<dpliance-chatbot></dpliance-chatbot>`,
    });
    expect(page.root).toEqualHtml(`
      <dpliance-chatbot>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dpliance-chatbot>
    `);
  });
});
