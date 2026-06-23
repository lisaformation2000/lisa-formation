import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface WelcomeEmailProps {
  prenom: string
  siteUrl: string
}

const couleurs = {
  fond: '#070014',
  bandeau: '#000000',
  rose: '#F472B6',
  violet: '#A78BFA',
  cyan: '#67E8F9',
  texte: '#E5E7EB',
  texteAtténué: '#9CA3AF',
}

export default function WelcomeEmail({ prenom, siteUrl }: WelcomeEmailProps) {
  const prenomAffiche = prenom || 'toi'

  return (
    <Html lang="fr">
      <Head />
      <Preview>Bienvenue dans LISA — ton accès est prêt, direction la Session 1.</Preview>
      <Body style={{ backgroundColor: couleurs.fond, fontFamily: 'Helvetica, Arial, sans-serif', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '480px', margin: '0 auto' }}>
          {/* Bandeau logo */}
          <Section style={{ backgroundColor: couleurs.bandeau, textAlign: 'center', padding: '24px 0' }}>
            <Img
              src={`${siteUrl}/logo-lisa.png`}
              alt="LISA — La formation pour débuter avec l'IA"
              width="160"
              style={{ margin: '0 auto', display: 'block' }}
            />
          </Section>

          <Section style={{ padding: '36px 28px 8px' }}>
            <Heading style={{ color: '#ffffff', fontSize: '22px', fontWeight: 800, margin: '0 0 8px' }}>
              Bienvenue, {prenomAffiche} 🎉
            </Heading>
            <Text style={{ color: couleurs.texte, fontSize: '15px', lineHeight: '24px' }}>
              Ton paiement a bien été confirmé. Ton accès à LISA est ouvert dès maintenant —
              30 sessions, à ton rythme, à vie.
            </Text>
          </Section>

          <Section style={{ padding: '8px 28px 24px', textAlign: 'center' }}>
            <Link
              href={`${siteUrl}/dashboard`}
              style={{
                display: 'inline-block',
                background: `linear-gradient(90deg, ${couleurs.violet}, ${couleurs.rose})`,
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '15px',
                padding: '14px 32px',
                borderRadius: '10px',
                textDecoration: 'none',
              }}
            >
              Accéder à ma formation
            </Link>
          </Section>

          <Hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '8px 28px' }} />

          <Section style={{ padding: '24px 28px' }}>
            <Text style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700, margin: '0 0 12px' }}>
              Pour bien démarrer :
            </Text>
            <Text style={{ color: couleurs.texte, fontSize: '14px', lineHeight: '22px', margin: '0 0 6px' }}>
              1. Connecte-toi avec l'email utilisé à l'achat.
            </Text>
            <Text style={{ color: couleurs.texte, fontSize: '14px', lineHeight: '22px', margin: '0 0 6px' }}>
              2. Commence par la Session 1 si tu ne l'as pas déjà fait.
            </Text>
            <Text style={{ color: couleurs.texte, fontSize: '14px', lineHeight: '22px', margin: 0 }}>
              3. Avance à ton rythme — rien n'est chronométré.
            </Text>
          </Section>

          <Hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '8px 28px' }} />

          <Section style={{ padding: '20px 28px 36px' }}>
            <Text style={{ color: couleurs.texteAtténué, fontSize: '12px', lineHeight: '20px', margin: '0 0 12px' }}>
              Une question ? Réponds directement à cet email ou écris à{' '}
              <Link href="mailto:lisaformationia@gmail.com" style={{ color: couleurs.cyan }}>
                lisaformationia@gmail.com
              </Link>
              .
            </Text>
            <Text style={{ color: couleurs.texteAtténué, fontSize: '11px', lineHeight: '18px', margin: 0 }}>
              LISA — La formation pour débuter avec l'IA · formationlisa.fr
              <br />
              <Link href={`${siteUrl}/cgv`} style={{ color: couleurs.texteAtténué, textDecoration: 'underline' }}>
                CGV
              </Link>{' '}
              ·{' '}
              <Link href={`${siteUrl}/confidentialite`} style={{ color: couleurs.texteAtténué, textDecoration: 'underline' }}>
                Confidentialité
              </Link>{' '}
              ·{' '}
              <Link href={`${siteUrl}/retractation`} style={{ color: couleurs.texteAtténué, textDecoration: 'underline' }}>
                Droit de rétractation
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
