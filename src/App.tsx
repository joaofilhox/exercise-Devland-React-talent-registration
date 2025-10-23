import { useState } from 'react';
import TalentList from './components/talents/TalentList';
import TalentForm from './components/talents/TalentForm';
import PaymentList from './components/payments/PaymentList';
import PaymentForm from './components/payments/PaymentForm';

function App() {
  const [activeTab, setActiveTab] = useState<'talents' | 'payments'>('talents');
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <h1>Sistema de Gestão de Talentos</h1>

      <div>
        <button onClick={() => setActiveTab('talents')}>Talentos</button>
        <button onClick={() => setActiveTab('payments')}>Pagamentos</button>
      </div>

      {activeTab === 'talents' && (
        <>
          <TalentForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
          <TalentList key={refreshKey} />
        </>
      )}

      {activeTab === 'payments' && (
        <>
          <PaymentForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
          <PaymentList key={refreshKey} />
        </>
      )}
    </div>
  );
}

export default App;
