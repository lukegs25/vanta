import React, { useState } from 'react';

// Step 1: Your pricing data
const plans = [
  {
    name: 'Basic',
    price: 700,
    setup: 50,
    features: [
      "Content Creation",
      "Social Media Management",
      "Email",
      "SEO & Blogging",
      "Reporting",
      "Optional Add-Ons"
    ],
    details: [
      "1 post per week",
      "Agency-created content (40%)",
      "Weekly content calendars",
      "2 stories per week",
      "Community engagement 1x/week",
      "Weekly newsletter",
      "1 blog post/month",
      "Advanced SEO Optimization",
      "Basic monthly performance report",
      "Lead Gen: 1 campaign/month",
      "Website Chatbot (basic)",
      "Travel coordination: 3 trips",
      "categorization/processing receipts"
    ]
  },
  {
    name: 'Pro',
    price: 1900,
    setup: 100,
    features: [
      "Content Creation",
      "Social Media Management",
      "Email",
      "SEO & Blogging",
      "Web Services",
      "Chatbots",
      "Client Communication",
      "Admin Support",
      "Reporting",
      "Optional Add-Ons"
    ],
    details: [
      "4 posts per week",
      "Agency-created content (60%)",
      "Weekly content calendars",
      "3 stories per day",
      "Community engagement 3x/week",
      "Geotargeted posting: 2 locations",
      "Weekly newsletter",
      "1 blog post/week",
      "Advanced SEO Optimization",
      "Basic website buildout",
      "Social media chatbot",
      "Monthly industry updates",
      "10 invoices categorized per month",
      "Basic monthly performance report",
      "Extra email campaigns",
      "Photography shoot(s)"
    ]
  },
  {
    name: 'Premium',
    price: 4500,
    setup: 275,
    features: [
      "Content Creation",
      "Social Media Management",
      "Email",
      "SEO & Blogging",
      "Web Services",
      "Chatbots and Automation",
      "Client Communication",
      "Admin Support",
      "Lead Generation",
      "Reporting",
      "Optional Add-Ons"
    ],
    details: [
      "7 posts per week",
      "100% Agency-created content",
      "Weekly content calendars",
      "2 stories per day",
      "Community engagement 5x/week",
      "Geotargeted posting: 3 locations",
      "Weekly newsletter",
      "1 blog post/week",
      "Advanced SEO Optimization",
      "Advanced website buildout",
      "Website chatbot (advanced)",
      "Social media chatbot",
      "Internal company chatbot",
      "Weekly industry updates to clients",
      "600 invoices categorized monthly",
      "Full travel coordination support",
      "2 email campaigns per month",
      "Advanced reporting",
      "More geotargeted locations",
      "Additional photography shoots",
      "Additional lead generation"
    ]
  }
];

// Step 2: Card UI component
function PricingCard({ plan, isOpen, onToggle, isPopular }) {
  return (
    <div style={{
      background: '#18131c',
      borderRadius: '16px',
      boxShadow: isPopular
        ? '0 4px 24px 0 rgba(255, 170, 67, 0.55)'
        : '0 2px 12px 0 rgba(61, 61, 80, 0.55)',
      border: isPopular ? '2px solid #ffaa43' : '1px solid #444',
      color: 'white',
      padding: 32,
      width: 330,
      margin: 16,
      position: 'relative',
      minHeight: 450
    }}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <h2>{plan.name}</h2>
        {isPopular && (
          <span style={{
            marginLeft: 12,
            background: '#ffaa43',
            color: '#18131c',
            borderRadius: 6,
            padding: '2px 8px',
            fontWeight: 'bold',
            fontSize: 12
          }}>Most Popular</span>
        )}
      </div>
      <div style={{fontSize: 32, margin: '16px 0'}}>
        ${plan.price}
        <span style={{fontSize: 18, color: '#ffaa43'}}>/month</span>
      </div>
      <div style={{color: '#bcae91', fontSize: 15, marginBottom: 12}}>
        + ${plan.setup} set up
      </div>
      <ul>
        {plan.features.map(f => (
          <li key={f} style={{marginBottom: 7, fontSize: 18}}>✓ {f}</li>
        ))}
      </ul>
      <button
        onClick={onToggle}
        style={{
          marginTop: 16,
          marginBottom: isOpen ? 8 : 24,
          background: '#18131c',
          color: '#ffaa43',
          border: '1px solid #ffaa43',
          borderRadius: 8,
          padding: '8px 16px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >{isOpen ? 'Hide Details' : 'Show Details'}</button>
      {isOpen && (
        <div style={{
          background: '#151019',
          padding: 16,
          borderRadius: 10,
          marginBottom: 16,
          boxShadow: '0 2px 8px 0 rgba(255,170,67,0.13)',
          color: '#ffdbac'
        }}>
          <ul style={{margin: 0, padding: 0}}>
            {plan.details.map(d => (
              <li key={d} style={{marginBottom: 3, fontSize: 16}}>{d}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        style={{
          marginTop: 8,
          width: '100%',
          background: 'linear-gradient(90deg, #ffaa43 0%, #fff5df 100%)',
          color: '#18131c',
          border: 'none',
          borderRadius: 8,
          padding: '14px 0',
          fontWeight: 'bold',
          fontSize: 18,
          boxShadow: isPopular
            ? '0 0 20px 3px #ffaa43'
            : '0 0 12px 1px #444'
        }}
      >GET STARTED</button>
    </div>
  );
}

// Step 3: PricingSection (main export)
export default function PricingSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div style={{
      background: '#130d18',
      minHeight: '100vh',
      padding: '50px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{
        color: 'white',
        fontSize: 38,
        fontWeight: 800,
        marginBottom: 6
      }}>Flexible Pricing for Every Business</h1>
      <p style={{
        color: '#cea263',
        fontSize: 18,
        marginBottom: 42
      }}>Choose a plan that fits your needs and scale effortlessly with our AI-powered inventory solutions.</p>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        maxWidth: 1200,
        width: '100%'
      }}>
        {plans.map((plan, idx) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            isOpen={openIdx === idx}
            onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            isPopular={plan.name === "Premium"}
          />
        ))}
      </div>
    </div>
  );
}
