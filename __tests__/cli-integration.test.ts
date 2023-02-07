import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')

const cli = async (cmd) =>
  system.run(
    'node ' + filesystem.path(src, 'bin', 'react-modest-cli') + ` ${cmd}`
  )
describe('react-modest-cli', () => {
  describe('help commands', () => {
    it('outputs version', async () => {
      const output = await cli('--version')
      expect(output).toContain('0.0.1')
    })

    it('outputs help', async () => {
      const output = await cli('--help')
      expect(output).toContain('0.0.1')
    })
  })

  describe('create files command', () => {
    describe('when user types invalid parameters', () => {
      it('should validate missing name before generate files', async () => {
        const output = await cli('create')

        expect(output).toContain('A component name should be provided.')
      })

      it('should validate missing type before generate files', async () => {
        const output = await cli('create first-component js')

        expect(output).toContain(
          'Invalid type paramter. Try one of these keys: css, styled, scss, single.'
        )
      })

      it('should validate wrong type before generate files', async () => {
        const output = await cli('create first-component js --type=fake')

        expect(output).toContain(
          'Invalid type paramter. Try one of these keys: css, styled, scss, single.'
        )
      })

      it('should validate wrong language before validate files', async () => {
        const output = await cli('create ys first-component --type=fake')

        expect(output).toContain(
          'Unsuported language. Please insert one of these keys: ts, typescript, js, javascript.'
        )
      })
    })

    describe('when user types correct params', () => {
      it('should generate correct js template for single', async () => {
        const output = await cli('create card js --type=single')

        expect(output).toContain(
          'Template generated successfully at folder src/components'
        )
        const singleModel = filesystem.read('src/components/card.jsx')
        expect(singleModel).toBeTruthy()

        filesystem.remove('src/components/')
      })

      it('should generate correct js template for css', async () => {
        const output = await cli('create card js --type=css')

        expect(output).toContain(
          'Template generated successfully at folder src/components'
        )
        const singleModel = filesystem.read('src/components/card.jsx')
        const singleModelCss = filesystem.read('src/components/style.css')

        expect(singleModel).toBeTruthy()
        expect(singleModelCss).toBeTruthy()

        filesystem.remove('src/components/')
      })

      it('should generate correct ts template for single', async () => {
        const output = await cli('create card ts --type=single')

        expect(output).toContain(
          'Template generated successfully at folder src/components'
        )
        const singleModel = filesystem.read('src/components/card.tsx')
        expect(singleModel).toBeTruthy()

        filesystem.remove('src/components/')
      })

      it('should generate correct js template for css', async () => {
        const output = await cli('create card ts --type=css')

        expect(output).toContain(
          'Template generated successfully at folder src/components'
        )
        const singleModel = filesystem.read('src/components/card.tsx')
        const singleModelCss = filesystem.read('src/components/style.css')

        expect(singleModel).toBeTruthy()
        expect(singleModelCss).toBeTruthy()

        filesystem.remove('src/components/')
      })
    })
  })
})
