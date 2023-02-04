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
    it('should validate missing name before generate files', async () => {
      const output = await cli('create')

      expect(output).toContain('A component name should be provided.')
    })

    it('should validate missing type before generate files', async () => {
      const output = await cli('create first-component')

      expect(output).toContain(
        'Invalid type paramter. Try one of css, styled, scss, single'
      )
    })

    it('should validate wrong type before generate files', async () => {
      const output = await cli('create first-component --type=fake')

      expect(output).toContain(
        'Invalid type paramter. Try one of css, styled, scss, single'
      )
    })
  })
})
