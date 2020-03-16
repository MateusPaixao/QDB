import React from 'react'
import Painel from './_Painel'

describe('painel test snapshopt', () => {
    it('renders and displays information', () => {
        const wrapper = mount(
            <Painel Url="/busca/?fq=H:464" Src="https://qbbr.vteximg.com.br/arquivos/ids/170372/painel_SUPER-BLACK_01.png" />
        )
        expect(wrapper.find('[dataid="painel"]')).toMatchSnapshot()
    })

    it('It contains an image', () => {
        const wrapper = mount(
            <Painel Url="/busca/?fq=H:464" Src="https://qbbr.vteximg.com.br/arquivos/ids/170372/painel_SUPER-BLACK_01.png" />
        )
        let content = wrapper.find('[dataid="painel"] img')
        let img_src = content.prop('data-src')
        console.log(img_src)
        expect(img_src).toMatch(/.(jpg|png|gif)$/)
    })

    it('URL is defined', () => {
        const wrapper = mount(
            <Painel Url="/busca/?fq=H:464" Src="https://qbbr.vteximg.com.br/arquivos/ids/170372/painel_SUPER-BLACK_01.png" />
        )
        let content = wrapper.find('[dataid="painel"]')
        let link = content.prop('href')
        console.log(link)
        expect(link).toBeDefined()
    })

    it('IMG is defined', () => {
        const wrapper = mount(
            <Painel Url="/busca/?fq=H:464" Src="https://qbbr.vteximg.com.br/arquivos/ids/170372/painel_SUPER-BLACK_01.png" />
        )
        let content = wrapper.find('[dataid="painel"] img')
        let image = content.prop('data-src')
        console.log(image)
        expect(image).toBeDefined()
    })

})