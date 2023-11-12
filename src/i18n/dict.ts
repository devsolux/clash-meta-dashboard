import {Flatten} from '@solid-primitives/i18n'
import {LANG} from '~/constants'
import en from './en'
import de from './de'
import tr from './tr'

export type Dict = Flatten<typeof en>

export default {
  [LANG.EN]: en,
  [LANG.DE]: de,
  [LANG.TR]: tr,
}
