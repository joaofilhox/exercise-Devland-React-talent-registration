import { useState } from 'react';
import TalentList from './components/talents/TalentList';
import TalentForm from './components/talents/TalentForm';
import PaymentList from './components/payments/PaymentList';
import PaymentForm from './components/payments/PaymentForm';
import styles from './App.module.css';

function App() {
  const [activeTab, setActiveTab] = useState<'talents' | 'payments'>('talents');
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Sistema de Gestão de Talentos</h1>
        </header>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'talents' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('talents')}
          >
            📋 Talentos
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'payments' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            💰 Pagamentos
          </button>
        </div>

        {activeTab === 'talents' && (
          <div className={styles.content}>
            <TalentForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
            <TalentList key={refreshKey} />
          </div>
        )}

        {activeTab === 'payments' && (
          <div className={styles.content}>
            <PaymentForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
            <PaymentList key={refreshKey} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
