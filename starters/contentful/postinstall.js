/**
 * Downloads FFMPEG && FFPROBE if they are missing on this machine
 */

const os = require('os')
const { resolve } = require('path')

const mkdirp = require('mkdirp')
const execa = require('execa')
const { exists } = require('fs-extra')

const arch = os.arch()
const platform = os.platform()

const BASE_DIR = resolve(
  __dirname,
  'node_modules',
  '.cache',
  'gatsby-transformer-video-bins',
  arch,
  platform
)

;(async () => {
  const isInstalledCommand = platform === 'win32' ? 'WHERE' : 'command'
  const isInstalledParams = platform === 'win32' ? [] : ['-v']

  try {
    await exists(resolve(BASE_DIR, 'ffmpeg'))
    await exists(resolve(BASE_DIR, 'ffprobe'))
    console.log('FFMPEG && FFPROBE already installed')
    return
  } catch {}

  try {
    await execa(isInstalledCommand, [...isInstalledParams, 'ffmpeg'])
    await execa(isInstalledCommand, [...isInstalledParams, 'ffprobe'])

    console.log('Using installed FFMPEG && FFPROBE')
  } catch {
    console.log(`Downloading and extracting binaries for ${platform}@${arch}`)

    await mkdirp(BASE_DIR)

    const execaConfig = {
      cwd: BASE_DIR,
      stdout: 'inherit',
      stderr: 'inherit',
    }

    switch (platform) {
      case 'win32':
        console.log(
          'Downloading FFMPEG && FFPROBE (Note: This script is not yet tested on windows'
        )

        await execa(
          'curl',
          [
            '-L',
            '-o',
            'ffmpeg.zip',
            'https://ffmpeg.zeranoe.com/builds/win64/static/ffmpeg-latest-win64-static.zip',
          ],
          execaConfig
        )

        console.log('Unzipping FFMPEG && FFPROBE')
        await execa('tar', ['-xf', 'ffmpeg.zip'], execaConfig)

        console.log('Cleanup')
        await execa('mv', ['bin/*', '.'], execaConfig)
        await execa('rm', ['-rf', 'ffmpeg-latest-win64-static'], execaConfig)
        break
      case 'linux':
        console.log('Downloading FFMPEG && FFPROBE')

        await execa(
          'wget',
          [
            '-O',
            'ffmpeg.zip',
            'https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz',
          ],
          execaConfig
        )

        console.log('Unzipping FFMPEG && FFPROBE')
        await execa('tar', ['-xf', 'ffmpeg.zip', '--strip', '1'], execaConfig)

        console.log('Cleanup')
        await execa('rm', ['ffmpeg.zip', 'ffmpeg-*'], execaConfig)
        break
      case 'darwin':
        console.log('Downloading FFMPEG')
        await execa(
          'curl',
          [
            '-L',
            '-J',
            '-o',
            'ffmpeg.zip',
            'https://evermeet.cx/ffmpeg/getrelease/zip',
          ],
          execaConfig
        )
        console.log('Downloading FFPROBE')
        await execa(
          'curl',
          [
            '-L',
            '-o',
            'ffprobe.zip',
            'https://evermeet.cx/ffmpeg/getrelease/ffprobe/zip',
          ],
          execaConfig
        )

        console.log('Unzipping FFPROBE')
        await execa('unzip', ['-o', 'ffmpeg.zip'], execaConfig)
        await execa('unzip', ['-o', 'ffprobe.zip'], execaConfig)

        console.log('Cleanup')
        await execa('rm', ['ffmpeg.zip', 'ffprobe.zip'], execaConfig)
        break
      default:
        throw new Error(`Downloading FFMPEG for ${platform} is not supported`)
    }

    console.log(
      'Finished. This system is ready to convert videos with GatsbyJS'
    )
  }
})()
