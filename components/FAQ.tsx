import { useState } from 'react';
import faqStyles from '../styles/FAQ.module.css';

// FAQ data structure
const faqs = [
  {
    question: "What is Marshmallow?",
    answer: "Marshmallow is a fun, hands-on platform that teaches kids about money on the Solana blockchain. With key principles like saving, earning, and goal-setting, Marshmallow helps kids learn how to manage money by completing jobs, setting financial goals, and earning savings rewards—all guided by their parents."
  },
  {
    question: "How does Marshmallow work?",
    answer: "Marshmallow lets parents set allowances, jobs, and savings incentives for their kids. The family's financial system runs on a **DAO** (Decentralized Autonomous Organization)—think of it as the piggy bank re-imagined. Parents control the money flow, while kids learn to manage their finances in a safe and guided environment."
  },
  {
    question: "What is a DAO, and how does it work in Marshmallow?",
    answer: "A **DAO** is a decentralized, digital way of making financial decisions together. In Marshmallow, the DAO acts like a family piggy bank, but with extra safety features. Parents approve jobs, rewards, and withdrawals, while kids interact with real money to learn valuable financial lessons. Parents get oversight, and kids get autonomy—perfectly balanced."
  },
  {
    question: "What is the inspiration behind Marshmallow?",
    answer: "Marshmallow is inspired by the **Stanford Marshmallow Experiment**, where kids who waited for a second marshmallow showed better long-term outcomes. We've built this idea into Marshmallow—kids learn the value of patience and smart decision-making while earning real rewards."
  },
  {
    question: "Do kids need their own crypto wallet?",
    answer: "Nope! Kids don't need a full crypto wallet. Marshmallow creates a special wallet for them that holds a token, giving them access to the family DAO. Parents control all financial activity, so kids interact with crypto safely without managing a full wallet."
  },
  {
    question: "What age group is Marshmallow designed for?",
    answer: "Marshmallow is perfect for families with kids aged **5-16**. It teaches key financial skills in a fun, interactive way, with parents setting up allowances, jobs, and rewards, while the kids learn how to manage their money."
  },
  {
    question: "What makes Marshmallow different from other financial education apps?",
    answer: "Marshmallow is the only app that combines **crypto** with fun financial challenges like jobs and quests. And the best part? No paperwork or KYC checks are needed! Families can jump in from anywhere in the world and start learning about money in a real-world environment."
  },
  {
    question: "How do parents control the financial activities on Marshmallow?",
    answer: "In Marshmallow, parents stay in control using the family DAO. Any time a kid wants to make a withdrawal or complete a job, parents need to approve it. This gives kids the freedom to make financial choices, but always within a safe, supervised system where parents oversee everything."
  },
  {
    question: "What currencies are supported?",
    answer: "Marshmallow runs on Solana and supports crypto transactions, including stablecoins like **USD-C**, giving families flexibility in how they save and earn."
  },
  {
    question: "Is Marshmallow globally accessible?",
    answer: "Yes! Marshmallow doesn't require **KYC** (Know Your Customer) checks, making it easy for families anywhere in the world to join and start learning about money with no extra paperwork."
  },
  {
    question: "Is Marshmallow safe for my kids?",
    answer: "Absolutely. Marshmallow is built with safety in mind. Parents control all allowances, rewards, and withdrawals, so kids can only interact with the family DAO under parental supervision. Every action is approved by parents to make sure the learning is safe and secure."
  },
  {
    question: "Is Marshmallow private?",
    answer: "While transactions on the blockchain are public, **Marshmallow prioritizes privacy**. No personal information is linked to on-chain activity, and since there are no KYC requirements, your family's identity stays private. Parents control all the important financial decisions, ensuring privacy and security for the family."
  }
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

return (
  <div className={faqStyles.faqSection}>
    <h2 className={faqStyles.faqTitle}>Frequently Asked Questions</h2>
    <div className={faqStyles.faqList}>
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className={`${faqStyles.faqItem} ${openFaq === index ? faqStyles.open : ''}`}
          onClick={() => toggleFaq(index)}
        >
          <div className={faqStyles.questionRow}>
            <h3 className={faqStyles.question}>{faq.question}</h3>
            <svg 
              className={faqStyles.chevron} 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={faqStyles.answerWrapper}>
            <p 
              className={faqStyles.answer}
              dangerouslySetInnerHTML={{ 
                __html: faq.answer.replace(
                  /\*\*(.*?)\*\*/g, 
                  '<strong>$1</strong>'
                ) 
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}