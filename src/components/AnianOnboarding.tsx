import { startTransition, useEffect, useState, type FormEvent, type ReactNode } from 'react'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { ArrowRightIcon, LockIcon, SparkIcon } from './icons'

type Language = 'en' | 'zh'
type RitualTime = 'morning' | 'afternoon' | 'evening' | 'night'

interface ConnectState {
  telegram: {
    token: string
    expiresAt: string
    deepLink: string | null
  }
  wechat: {
    token: string
    expiresAt: string
    accountName: string
    qrUrl: string | null
    status: string
  }
  whatsapp: {
    status: string
  }
}

interface FormState {
  email: string
  displayName: string
  language: Language
  city: string
  country: string
  timezone: string
  birthday: string
  birthTime: string
  ritualTime: RitualTime
  desire: string
  emotionalState: string
  experienceLevel: string
}

const apiBase = (import.meta.env.VITE_ANIAN_API_BASE || 'https://anian-api.dijicomp.com').replace(/\/$/, '')

const timezones = [
  'Asia/Shanghai',
  'Europe/Rome',
  'Europe/London',
  'America/New_York',
  'America/Los_Angeles',
  'America/Toronto',
  'Asia/Singapore',
  'Asia/Bangkok',
  'Asia/Tokyo',
  'Australia/Sydney',
]

const initialTimezone = (() => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Shanghai'
  } catch {
    return 'Asia/Shanghai'
  }
})()

const copy = {
  en: {
    eyebrow: 'ANIAN',
    title: 'Create your space',
    subtitle: 'A private companion space for manifestation, memory, and daily return.',
    formTitle: 'Tell us about you',
    formSubtitle: 'So Anian can begin with the right language, rhythm, and local time.',
    language: 'Language',
    name: 'Name',
    email: 'Email',
    location: 'Where do you live?',
    city: 'City',
    country: 'Country',
    timezone: 'Timezone',
    birthday: 'Birthday',
    birthTime: 'Birth time',
    optional: 'Optional',
    desire: 'What are you calling in?',
    emotionalState: 'How does it feel right now?',
    experienceLevel: 'Manifestation experience',
    ritualTime: 'Preferred ritual time',
    enter: 'Enter my space',
    safe: 'Your information is used only to set up your Anian space.',
    connectTitle: 'How do you want to talk to Anian?',
    connectSubtitle: 'Your profile is ready. Choose the channel that should become your private Anian.',
    telegram: 'Telegram',
    telegramBody: 'Open Anian in Telegram. The link carries your private setup token.',
    wechat: 'WeChat',
    wechatBody: 'Official Account linking path. Scan the QR when configured, or keep this token for the account scene.',
    whatsapp: 'WhatsApp',
    whatsappBody: 'Coming soon.',
    openTelegram: 'Open Telegram',
    token: 'Link token',
    comingSoon: 'Coming soon',
    qrPending: 'Official Account QR is not configured yet.',
    submitError: 'Could not create your Anian space. Try again in a moment.',
    ritual: {
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',
      night: 'Night',
    },
    experience: {
      new: 'New to this',
      some: 'I know the basics',
      deep: 'I practice often',
    },
  },
  zh: {
    eyebrow: 'ANIAN',
    title: '创建你的空间',
    subtitle: '一个属于你的显化、记忆和日常回来的地方。',
    formTitle: '先让我认识你',
    formSubtitle: '这样念念一开始就知道你的语言、节奏和本地时间。',
    language: '语言',
    name: '名字',
    email: '邮箱',
    location: '你住在哪里？',
    city: '城市',
    country: '国家',
    timezone: '时区',
    birthday: '生日',
    birthTime: '出生时间',
    optional: '可选',
    desire: '你想显化什么？',
    emotionalState: '现在想到它，身体是什么感觉？',
    experienceLevel: '显化经验',
    ritualTime: '希望念念什么时候来碰你一下？',
    enter: '进入我的空间',
    safe: '这些信息只用于创建你的念念空间。',
    connectTitle: '你想在哪里和念念说话？',
    connectSubtitle: '你的资料已经准备好。选择一个渠道，它会变成你的私人念念。',
    telegram: 'Telegram',
    telegramBody: '打开 Telegram。这个链接会带上你的私人连接令牌。',
    wechat: '微信',
    wechatBody: '公众号连接路径。配置好后扫码即可，暂时可以保留这个场景令牌。',
    whatsapp: 'WhatsApp',
    whatsappBody: '即将开放。',
    openTelegram: '打开 Telegram',
    token: '连接令牌',
    comingSoon: '即将开放',
    qrPending: '公众号二维码还没有配置。',
    submitError: '暂时没创建成功。等一下再试。',
    ritual: {
      morning: '早上',
      afternoon: '下午',
      evening: '晚上',
      night: '夜里',
    },
    experience: {
      new: '刚开始',
      some: '知道一些',
      deep: '经常练习',
    },
  },
} as const

const easing = [0.22, 1, 0.36, 1] as const

const emptyForm: FormState = {
  email: '',
  displayName: '',
  language: 'en',
  city: '',
  country: '',
  timezone: timezones.includes(initialTimezone) ? initialTimezone : 'Asia/Shanghai',
  birthday: '',
  birthTime: '',
  ritualTime: 'evening',
  desire: '',
  emotionalState: '',
  experienceLevel: 'new',
}

export function AnianOnboarding() {
  const [language, setLanguage] = useState<Language>('en')
  const [form, setForm] = useState<FormState>(emptyForm)
  const [connect, setConnect] = useState<ConnectState | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const shouldReduceMotion = useReducedMotion()
  const t = copy[language]

  useEffect(() => {
    document.title = language === 'zh' ? 'ANIAN | 创建你的空间' : 'ANIAN | Create your space'
  }, [language])

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function switchLanguage(nextLanguage: Language) {
    startTransition(() => {
      setLanguage(nextLanguage)
      setForm((current) => ({ ...current, language: nextLanguage }))
    })
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const response = await fetch(`${apiBase}/public/anian/onboarding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) {
        throw new Error(`registration failed: ${response.status}`)
      }
      const payload = (await response.json()) as { connect: ConnectState }
      setConnect(payload.connect)
    } catch {
      setError(t.submitError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#050606] text-[#e8e6dc]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(234,229,210,0.13),transparent_24%),radial-gradient(circle_at_84%_20%,rgba(120,132,112,0.2),transparent_20%),linear-gradient(130deg,#050606_0%,#111210_48%,#050505_100%)]" />
      <div className="pointer-events-none absolute -left-28 bottom-[-16rem] h-[42rem] w-[42rem] rounded-full border border-[#d7d8c9]/10 bg-[radial-gradient(circle,rgba(214,214,196,0.14),transparent_62%)] blur-sm" />
      <div className="pointer-events-none absolute right-[-16rem] top-[-18rem] h-[38rem] w-[38rem] rounded-full border border-[#d7d8c9]/10 bg-[radial-gradient(circle,rgba(214,214,196,0.16),transparent_58%)]" />

      <section className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1480px] gap-6 px-4 py-5 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-8">
        <motion.aside
          className="relative hidden overflow-hidden rounded-[34px] border border-[#e4e2d4]/18 bg-black/30 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.46)] lg:flex lg:min-h-[calc(100vh-4rem)] lg:flex-col lg:items-center lg:justify-center"
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: easing }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(209,208,190,0.24),transparent_17%),radial-gradient(circle_at_22%_88%,rgba(209,208,190,0.16),transparent_28%)]" />
          <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-[#d6d6c5]/24 to-transparent" />
          <div className="absolute bottom-0 left-0 h-1/2 w-full bg-[linear-gradient(20deg,rgba(210,202,176,0.16),transparent_50%)]" />

          <div className="relative flex flex-col items-center text-center">
            <img
              src="/assets/anian/anian-logo.png"
              alt="Anian"
              className="mb-14 h-32 w-32 object-contain opacity-90 drop-shadow-[0_0_32px_rgba(232,232,218,0.18)]"
            />
            <h1 className="max-w-[28rem] font-serif text-[clamp(3.2rem,5.5vw,5.9rem)] leading-[0.92] tracking-[-0.06em] text-[#efeee8]">
              {t.title}
            </h1>
            <SparkIcon className="my-8 h-8 w-8 text-[#d8d8ca]/80" />
            <p className="max-w-[23rem] text-[1.12rem] leading-8 text-[#e8e6dc]/70">
              {t.subtitle}
            </p>
          </div>
        </motion.aside>

        <motion.section
          className="relative flex min-h-[calc(100vh-2.5rem)] items-center justify-center overflow-hidden rounded-[30px] border border-[#e4e2d4]/18 bg-[#090a09]/72 px-4 py-6 shadow-[0_24px_90px_rgba(0,0,0,0.44)] backdrop-blur-xl sm:px-7 lg:min-h-[calc(100vh-4rem)] lg:rounded-[34px] lg:px-10"
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: easing, delay: 0.05 }}
        >
          <div className="absolute inset-x-8 top-20 hidden h-px bg-gradient-to-r from-transparent via-[#d6d6c5]/22 to-transparent sm:block" />
          <div className="absolute inset-x-8 bottom-24 hidden h-px bg-gradient-to-r from-transparent via-[#d6d6c5]/14 to-transparent sm:block" />

          <div className="w-full max-w-[42rem]">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src="/assets/anian/anian-logo.png" alt="" className="h-10 w-10 object-contain" />
                <span className="font-display text-[0.82rem] uppercase tracking-[0.42em] text-[#d6d6c8]">
                  {t.eyebrow}
                </span>
              </div>
              <div className="flex rounded-full border border-[#d8d8c7]/16 bg-white/[0.035] p-1">
                {(['en', 'zh'] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => switchLanguage(item)}
                    className={`rounded-full px-3 py-1.5 text-[0.78rem] font-medium uppercase tracking-[0.2em] transition ${
                      language === item ? 'bg-[#d9dbca] text-[#12130f]' : 'text-[#e7e3d3]/56 hover:text-[#f2f0e8]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {connect ? (
                <motion.div
                  key="connect"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -18 }}
                  transition={{ duration: 0.35, ease: easing }}
                >
                  <PanelHeader title={t.connectTitle} subtitle={t.connectSubtitle} />
                  <div className="mt-8 grid gap-4">
                    <ConnectCard
                      title={t.wechat}
                      body={t.wechatBody}
                      tokenLabel={t.token}
                      token={connect.wechat.token}
                      disabled={!connect.wechat.qrUrl}
                      actionLabel={connect.wechat.qrUrl ? 'Open WeChat QR' : t.qrPending}
                      href={connect.wechat.qrUrl}
                    />
                    <ConnectCard
                      title={t.telegram}
                      body={t.telegramBody}
                      tokenLabel={t.token}
                      token={connect.telegram.token}
                      disabled={!connect.telegram.deepLink}
                      actionLabel={connect.telegram.deepLink ? t.openTelegram : 'Telegram bot URL not configured'}
                      href={connect.telegram.deepLink}
                    />
                    <ConnectCard
                      title={t.whatsapp}
                      body={t.whatsappBody}
                      tokenLabel={t.comingSoon}
                      token="WhatsApp Cloud API"
                      disabled
                      actionLabel={t.comingSoon}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submitForm}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -18 }}
                  transition={{ duration: 0.35, ease: easing }}
                >
                  <PanelHeader title={t.formTitle} subtitle={t.formSubtitle} />
                  <div className="mt-7 grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label={t.name}>
                        <input
                          required
                          value={form.displayName}
                          onChange={(event) => setField('displayName', event.target.value)}
                          className="anian-input"
                          placeholder={language === 'zh' ? '你的名字' : 'Your name'}
                        />
                      </Field>
                      <Field label={t.email}>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(event) => setField('email', event.target.value)}
                          className="anian-input"
                          placeholder="you@example.com"
                        />
                      </Field>
                    </div>

                    <Field label={t.language}>
                      <select
                        value={form.language}
                        onChange={(event) => switchLanguage(event.target.value as Language)}
                        className="anian-input"
                      >
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                      </select>
                    </Field>

                    <div>
                      <p className="mb-3 text-sm font-semibold text-[#efeee7]/86">{t.location}</p>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <Field label={t.city}>
                          <input
                            required
                            value={form.city}
                            onChange={(event) => setField('city', event.target.value)}
                            className="anian-input"
                            placeholder={language === 'zh' ? '长沙' : 'Changsha'}
                          />
                        </Field>
                        <Field label={t.country}>
                          <input
                            required
                            value={form.country}
                            onChange={(event) => setField('country', event.target.value)}
                            className="anian-input"
                            placeholder={language === 'zh' ? '中国' : 'China'}
                          />
                        </Field>
                        <Field label={t.timezone}>
                          <select
                            required
                            value={form.timezone}
                            onChange={(event) => setField('timezone', event.target.value)}
                            className="anian-input"
                          >
                            {timezones.map((timezone) => (
                              <option key={timezone} value={timezone}>
                                {timezone}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label={t.birthday}>
                        <input
                          type="date"
                          value={form.birthday}
                          onChange={(event) => setField('birthday', event.target.value)}
                          className="anian-input"
                        />
                      </Field>
                      <Field label={`${t.birthTime} (${t.optional})`}>
                        <input
                          type="time"
                          value={form.birthTime}
                          onChange={(event) => setField('birthTime', event.target.value)}
                          className="anian-input"
                        />
                      </Field>
                    </div>

                    <Field label={t.desire}>
                      <textarea
                        required
                        value={form.desire}
                        onChange={(event) => setField('desire', event.target.value)}
                        className="anian-input min-h-24 resize-none py-3"
                        placeholder={language === 'zh' ? '例如：关系、钱、事业、搬家、一个新的自己' : 'Love, money, work, a home, a new version of me...'}
                      />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label={t.emotionalState}>
                        <input
                          required
                          value={form.emotionalState}
                          onChange={(event) => setField('emotionalState', event.target.value)}
                          className="anian-input"
                          placeholder={language === 'zh' ? '紧、期待、害怕、卡住...' : 'Tight, hopeful, scared, stuck...'}
                        />
                      </Field>
                      <Field label={t.experienceLevel}>
                        <select
                          required
                          value={form.experienceLevel}
                          onChange={(event) => setField('experienceLevel', event.target.value)}
                          className="anian-input"
                        >
                          <option value="new">{t.experience.new}</option>
                          <option value="some">{t.experience.some}</option>
                          <option value="deep">{t.experience.deep}</option>
                        </select>
                      </Field>
                    </div>

                    <div>
                      <p className="mb-3 text-sm font-semibold text-[#efeee7]/86">{t.ritualTime}</p>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {(['morning', 'afternoon', 'evening', 'night'] as const).map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setField('ritualTime', item)}
                            className={`rounded-full border px-4 py-3 text-sm transition ${
                              form.ritualTime === item
                                ? 'border-[#d9dbca] bg-[#d9dbca] text-[#11120f]'
                                : 'border-[#d8d8c7]/14 bg-white/[0.035] text-[#ebe8dc]/72 hover:border-[#d8d8c7]/34'
                            }`}
                          >
                            {t.ritual[item]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {error ? <p className="text-sm text-[#ffb7a3]">{error}</p> : null}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-3 inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#d8d8c7]/16 bg-[#d9dbca] px-6 text-[1.04rem] font-semibold text-[#11120f] transition hover:bg-[#f0f0e5] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span>{isSubmitting ? '...' : t.enter}</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </button>

                    <p className="flex items-center justify-center gap-2 text-center text-sm text-[#e8e5d6]/48">
                      <LockIcon className="h-4 w-4" />
                      {t.safe}
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </section>
    </main>
  )
}

function PanelHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-5 flex max-w-[22rem] items-center gap-4 text-[#d8d8c7]/70">
        <span className="h-px flex-1 bg-current/20" />
        <SparkIcon className="h-5 w-5" />
        <span className="h-px flex-1 bg-current/20" />
      </div>
      <h2 className="font-serif text-[clamp(2.35rem,5.4vw,4.2rem)] leading-[0.98] tracking-[-0.055em] text-[#f2f0e9]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-[32rem] text-[1rem] leading-7 text-[#e9e6d9]/62">
        {subtitle}
      </p>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#efeee7]/82">{label}</span>
      {children}
    </label>
  )
}

function ConnectCard({
  title,
  body,
  tokenLabel,
  token,
  actionLabel,
  href,
  disabled,
}: {
  title: string
  body: string
  tokenLabel: string
  token: string
  actionLabel: string
  href?: string | null
  disabled?: boolean
}) {
  return (
    <div className="rounded-[24px] border border-[#d8d8c7]/14 bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-serif text-3xl tracking-[-0.04em] text-[#f2f0e9]">{title}</h3>
          <p className="mt-2 max-w-[30rem] text-sm leading-6 text-[#e8e5d6]/60">{body}</p>
          <p className="mt-3 break-all rounded-2xl border border-[#d8d8c7]/10 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.16em] text-[#e8e5d6]/45">
            {tokenLabel}: {token}
          </p>
        </div>
        {href && !disabled ? (
          <a
            href={href}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#d9dbca] px-5 py-3 text-sm font-semibold text-[#11120f] transition hover:bg-[#f0f0e5]"
          >
            {actionLabel}
          </a>
        ) : (
          <span className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#d8d8c7]/14 px-5 py-3 text-sm text-[#e8e5d6]/48">
            {actionLabel}
          </span>
        )}
      </div>
    </div>
  )
}
