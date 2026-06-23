import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'

interface RetractationAckEmailProps {
  nom: string
  email: string
  referenceCommande?: string
  dateCommande?: string
}

export default function RetractationAckEmail({
  nom,
  email,
  referenceCommande,
  dateCommande,
}: RetractationAckEmailProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Confirmation de réception de ta demande de rétractation — LISA</Preview>
      <Body style={{ backgroundColor: '#070014', fontFamily: 'Helvetica, Arial, sans-serif', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '480px', margin: '0 auto', padding: '32px 28px' }}>
          <Heading style={{ color: '#ffffff', fontSize: '20px', fontWeight: 800, margin: '0 0 16px' }}>
            Ta demande de rétractation a bien été reçue
          </Heading>
          <Text style={{ color: '#E5E7EB', fontSize: '14px', lineHeight: '22px' }}>
            Bonjour {nom},
          </Text>
          <Text style={{ color: '#E5E7EB', fontSize: '14px', lineHeight: '22px' }}>
            Nous confirmons la réception de ta demande de rétractation concernant ta commande
            {referenceCommande ? ` n°${referenceCommande}` : ''}{dateCommande ? ` du ${dateCommande}` : ''},
            associée à l'adresse {email}.
          </Text>
          <Text style={{ color: '#E5E7EB', fontSize: '14px', lineHeight: '22px' }}>
            Conformément à l'article L221-25 du Code de la consommation, le remboursement
            (si tu y as droit) sera effectué dans un délai maximum de 14 jours à compter de la
            réception de cette demande, par le même moyen de paiement que celui utilisé pour la
            commande.
          </Text>
          <Text style={{ color: '#9CA3AF', fontSize: '12px', lineHeight: '20px', marginTop: '24px' }}>
            Cet email constitue l'accusé de réception de ta demande sur support durable, tel que
            prévu par la réglementation en vigueur. Conserve-le.
          </Text>
          <Text style={{ color: '#9CA3AF', fontSize: '11px', lineHeight: '18px', marginTop: '20px' }}>
            LISA — La formation pour débuter avec l'IA · lisaformationia@gmail.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
