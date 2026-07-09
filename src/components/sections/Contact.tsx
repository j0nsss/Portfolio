import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, Loader2, Mail, MapPin, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import NeuCard from '@/components/ui/NeuCard';
import NeuButton from '@/components/ui/NeuButton';
import NeuInput from '@/components/ui/NeuInput';
import NeuTextarea from '@/components/ui/NeuTextarea';
import type { ContactFormData } from '@/types';
import { GithubIcon, LinkedinIcon } from '@/assets/icons/SocialIcons';

type SubmitState = 'idle' | 'sending' | 'success';

export default function Contact() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({ mode: 'onBlur' });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState('sending');
    // TODO: Replace with EmailJS, Formspree, or backend endpoint
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitState('success');
  };

  return (
    <section id="contact" className="section-container section-padding scroll-mt-20">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let's work together"
        subtitle="Have a project in mind? I'd love to hear about it."
        center
      />

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <NeuCard className="p-6 h-full">
            <div className="flex items-center gap-2">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-neu-success opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-neu-success" />
              </span>
              <p className="font-display font-bold text-neu-text-primary">Available for Projects</p>
            </div>
            <p className="text-neu-text-secondary text-sm mt-3">
              Have a project in mind? I'd love to hear about it. I'm currently taking on new
              freelance work.
            </p>

            <div className="border-t border-neu-shadow-dark/30 my-4" />

            <ul className="space-y-3 text-neu-text-secondary text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-neu-accent shrink-0" /> hello@yourportfolio.dev
              </li>
              <li className="flex items-center gap-2">
                <LinkedinIcon /> /in/yourhandle
              </li>
              <li className="flex items-center gap-2">
                <GithubIcon />
                <span className="text-neu-accent">@</span> github.com/yourusername
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-neu-accent shrink-0" /> Your City, Country
              </li>
            </ul>
          </NeuCard>
        </div>

        <div className="lg:col-span-3">
          {submitState === 'success' ? (
            <NeuCard className="p-8 text-center" accent>
              <CheckCircle2 size={48} className="text-neu-success mx-auto" />
              <p className="text-neu-success font-display font-bold text-xl mt-4">Message sent!</p>
              <p className="text-neu-text-secondary mt-2">
                Thanks for reaching out — I'll get back to you soon.
              </p>
            </NeuCard>
          ) : (
            <NeuCard className="p-6 lg:p-8">
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
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
              </form>
            </NeuCard>
          )}
        </div>
      </div>
    </section>
  );
}
