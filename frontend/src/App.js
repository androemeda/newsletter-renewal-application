import React, { useState } from 'react';
import { startFlow, updateFlow } from './services/api';
import ProgressSteps from './components/ProgressSteps';

function App() {
  const [flowId, setFlowId] = useState(null);
  const [status, setStatus] = useState('INITIAL');
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = async () => {
    try {
      setIsRunning(true);
      const flow = await startFlow();
      setFlowId(flow._id);
      setStatus('WAITING_FIRST');
      setLogs(flow.logs);
      simulateFlow(flow._id);
    } catch (error) {
      console.error('Error starting flow:', error);
    }
  };

  const handleReset = () => {
    setFlowId(null);
    setStatus('INITIAL');
    setLogs([]);
    setIsRunning(false);
  };

  const simulateFlow = async (id) => {
    try {
      // First Reminder
      let response = Math.random() > 0.5 ? 'renewed' : 'did not renew';
      setLogs((prevLogs) => [
        ...prevLogs,
        { message: `First reminder sent... (user ${response})`, timestamp: new Date() },
      ]);
  
      if (response === 'renewed') {
        setStatus('COMPLETED');
        setLogs((prevLogs) => [
          ...prevLogs,
          { message: 'Flow ends.', timestamp: new Date() },
        ]);
        setIsRunning(false);
        return;
      }
  
      // Wait for first response
      await new Promise((resolve) => setTimeout(resolve, 3000));
  
      // Second Reminder
      response = Math.random() > 0.5 ? 'renewed' : 'did not renew';
      setLogs((prevLogs) => [
        ...prevLogs,
        { message: `Second reminder sent... (user ${response})`, timestamp: new Date() },
      ]);
  
      if (response === 'renewed') {
        setStatus('COMPLETED');
        setLogs((prevLogs) => [
          ...prevLogs,
          { message: 'Flow ends.', timestamp: new Date() },
        ]);
        setIsRunning(false);
        return;
      }
  
      // Wait for second response
      await new Promise((resolve) => setTimeout(resolve, 3000));
  
      // End Flow
      setStatus('COMPLETED');
      setLogs((prevLogs) => [
        ...prevLogs,
        { message: 'User did not renew. Flow completed.', timestamp: new Date() },
      ]);
      setIsRunning(false);
    } catch (error) {
      console.error('Error in flow simulation:', error);
      setIsRunning(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Newsletter Renewal Flow</h1>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-300"
          >
            Start Flow
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
          >
            Reset
          </button>
        </div>

        <div className="mb-6">
          <div className="text-center mb-4">
            <span className="text-lg font-medium">Status: </span>
            <span className="font-semibold">{status}</span>
          </div>
          <ProgressSteps currentStatus={status} />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            {logs.map((log, index) => (
              <div key={index} className="text-sm">
                <div>{log.message}</div>
                <div className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;