import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { CheckCircle2, Loader2, Mail, MapPin, ArrowRight, Terminal } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import NeuCard from '@/components/ui/NeuCard';
import NeuButton from '@/components/ui/NeuButton';
import NeuInput from '@/components/ui/NeuInput';
import NeuTextarea from '@/components/ui/NeuTextarea';
import type { ContactFormData } from '@/types';
import { GithubIcon, LinkedinIcon, TiktokIcon, InstagramIcon, WhatsappIcon } from '@/assets/icons/SocialIcons';
import { Reveal } from '@/hooks/useScrollReveal';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({ mode: 'onBlur' });

  const onSubmit = async () => {
    if (!formRef.current) return;
    setSubmitState('sending');
    try {
      await emailjs.sendForm(
        'service_5uh0sjw',
        'template_8sdrhvh',
        formRef.current,
        'eDxgJdF7iQcYEFTRm',
      );
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <section
      id="contact"
      className="section-container section-padding scroll-mt-20 relative overflow-hidden"
    >
      <span
        className="absolute -top-40 left-1/3 w-96 h-96 rounded-full bg-neu-accent/3 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Get in touch"
            title="Let's work together"
            subtitle="Have a project in mind? I'd love to hear about it."
            center
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <Reveal variant="fadeLeft" className="lg:col-span-2">
            <NeuCard className="p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex w-3 h-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-neu-success opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full w-3 h-3 bg-neu-success" />
                </span>
                <div>
                  <p className="font-display font-bold text-neu-text-primary text-sm">
                    Available for Projects
                  </p>
                  <p className="text-neu-text-secondary text-xs font-mono">// status: OPEN</p>
                </div>
              </div>

              <p className="text-neu-text-secondary text-sm leading-relaxed">
                Have a project in mind? I'd love to hear about it. I'm currently taking on new
                freelance work.
              </p>

              <div className="border-t border-neu-shadow-dark/20 my-5" />

              <ul className="space-y-3.5 text-neu-text-secondary text-sm">
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-neu-sm bg-neu-base shadow-neu-flat flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-neu-accent" />
                  </span>
                  jonadalzam@gmail.com
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-neu-sm bg-neu-base shadow-neu-flat flex items-center justify-center shrink-0">
                    <LinkedinIcon />
                  </span>
                  Junadhan Alzam
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-neu-sm bg-neu-base shadow-neu-flat flex items-center justify-center shrink-0">
                    <GithubIcon />
                  </span>
                  @j0nsss
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-neu-sm bg-neu-base shadow-neu-flat flex items-center justify-center shrink-0">
                    <TiktokIcon />
                  </span>
                  @jonad___
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-neu-sm bg-neu-base shadow-neu-flat flex items-center justify-center shrink-0">
                    <InstagramIcon />
                  </span>
                  @j0_nadd
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-neu-sm bg-neu-base shadow-neu-flat flex items-center justify-center shrink-0">
                    <WhatsappIcon />
                  </span>
                  +62 857-0435-8406
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-neu-sm bg-neu-base shadow-neu-flat flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-neu-accent" />
                  </span>
                  Yogyakarta, Indonesia
                </li>
              </ul>
            </NeuCard>
          </Reveal>

          <Reveal variant="fadeRight" className="lg:col-span-3">
            {submitState === 'success' ? (
              <NeuCard className="p-10 text-center" accent>
                <div className="w-16 h-16 rounded-full bg-neu-success/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} className="text-neu-success" />
                </div>
                <p className="text-neu-text-primary font-display font-bold text-xl mt-4">
                  Message sent!
                </p>
                <p className="text-neu-text-secondary text-sm mt-2 max-w-sm mx-auto leading-relaxed">
                  Thanks for reaching out — I'll review your message and get back to you within 24
                  hours.
                </p>
              </NeuCard>
            ) : (
              <NeuCard className="p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-neu-shadow-dark/20">
                  <Terminal size={16} className="text-neu-accent" />
                  <span className="font-mono text-xs text-neu-text-secondary">
                    $ contact --send-message
                  </span>
                </div>

                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                  <NeuInput
                    label="Full Name"
                    error={errors.name?.message}
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Must be at least 2 characters' },
                    })}
                  />
                  <NeuInput
                    label="Email Address"
                    type="email"
                    error={errors.email?.message}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                  />
                  <NeuInput
                    label="Subject"
                    error={errors.subject?.message}
                    {...register('subject', {
                      required: 'Subject is required',
                      minLength: { value: 5, message: 'Must be at least 5 characters' },
                    })}
                  />
                  <NeuTextarea
                    label="Message"
                    rows={5}
                    error={errors.message?.message}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 20, message: 'Must be at least 20 characters' },
                    })}
                  />
                  <NeuButton
                    type="submit"
                    variant="primary"
                    disabled={submitState === 'sending'}
                    icon={
                      submitState === 'sending' ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <ArrowRight size={18} />
                      )
                    }
                    iconPosition="right"
                    className="w-full"
                  >
                    {submitState === 'sending' ? 'Sending…' : 'Send Message'}
                  </NeuButton>
                  {submitState === 'error' && (
                    <p className="text-neu-error text-sm text-center">
                      Failed to send message. Please try again or email me directly.
                    </p>
                  )}
                </form>
              </NeuCard>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}