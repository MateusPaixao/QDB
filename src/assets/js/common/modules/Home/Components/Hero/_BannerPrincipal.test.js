import React from 'react';
import BannerPrincipal from './_BannerPrincipal';

describe('<Home/>', () => {
  it('renders and displays information properly', () => {
      const wrapper = mount(
          <BannerPrincipal Url="https://www.quemdisseberenice.com.br/box-surpresa_20200301/p?idsku=2632" Src="https://qbbr.vteximg.com.br/arquivos/ids/171097/qdb_c3_4_GOTAS-SECANTES.png" />
      );
      // console.log(wrapper.debug());
      expect(wrapper.find('[dataid="banner"]')).toMatchSnapshot();
  });
});
