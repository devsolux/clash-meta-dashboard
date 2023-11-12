import { A } from '@solidjs/router'
import { endpoint } from '~/signals'

export const LogoText = () => (
  <div class="text-md flex items-center gap-1 whitespace-nowrap font-bold uppercase sm:text-xl">
    <A
      class="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent"
      href={endpoint() ? '/' : '/setup'}
    >
      DevSolux
    </A>
  </div>
)
