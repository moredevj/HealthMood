import React, { useState } from 'react';
import '../components/UserProfile.css';

const UserProfile = () => {
  const [activeSubTab, setActiveSubTab] = useState('RESUMEN');
  const [userData] = useState({
    name: 'María González',
    profileImage: 'src/assets/maria.jpg', // Imagen de perfil de María
    members: 3,
    status: 'Excelente',
    pendingTasks: 1,
    registeredMembers: 2
  });

  const [familyMembers] = useState([
    {
      id: 1,
      name: 'Albahaca',
      type: 'Perra - Mestiza',
      image: 'src/assets/Albahaca.png', // Ruta a la imagen
      nextEvents: [
        { type: 'important', text: 'Compra importante', icon: '⚠️' },
        { type: 'vaccine', text: 'Vacunas', icon: '⚠️' }
      ]
    },
    {
      id: 2,
      name: 'Jelmut',
      type: 'Gato - DPC',
      age: '12 años',
      image: 'src/assets/gato.jpg', // Ruta a la imagen
      nextEvents: [
        { type: 'disabled', text: 'Inhabilitado', icon: '😊' }
      ]
    },
    {
      id: 3,
      name: 'María',
      type: 'Humano',
      birthDate: '24/08/1993',
      image: 'src/assets/maria.jpg', // Ruta a la imagen
      nextEvents: [
        { type: 'birthday', text: 'Cumpleaños', icon: '🎂' }
      ]
    }
  ]);

  const handleSubNavClick = (tab) => {
    setActiveSubTab(tab);
  };

  const handleViewDetails = (memberName) => {
    // Aquí puedes agregar la lógica para ver detalles
    // Por ejemplo, redirigir a otra página o abrir un modal
    console.log(`Ver detalles de ${memberName}`);
    alert(`Viendo detalles de ${memberName}`);
  };

  const renderMemberDetails = (member) => {
    const details = [];
    if (member.type) details.push(member.type);
    if (member.age) details.push(member.age);
    if (member.birthDate) details.push(member.birthDate);
    return details.join('\n');
  };

  const getStatusClass = (type) => {
    const statusClasses = {
      important: 'status-important',
      vaccine: 'status-vaccine',
      disabled: 'status-disabled',
      birthday: 'status-birthday'
    };
    return statusClasses[type] || '';
  };

  return (
    <div className="user-profile">
      {/* Subheader */}
      <div className="subheader">
        <div className="subheader-container">
          <nav className="subnav">
            {['RESUMEN', 'MANADA', 'COMPRAS', 'SALUD'].map((tab) => (
              <a
                key={tab}
                href="#"
                className={activeSubTab === tab ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubNavClick(tab);
                }}
              >
                {tab}
              </a>
            ))}
          </nav>
          <div className="user-name">{userData.name}</div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-container">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-text">
            <h1>¡Hola, {userData.name.split(' ')[0]}!</h1>
            <p>Tu manada te espera. Tienes {userData.registeredMembers} miembros registrados</p>
          </div>
          <div className="user-avatar">
            <img 
              src={userData.profileImage} 
              alt={userData.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/80x80/ffffff/7c3aed?text=' + userData.name.charAt(0);
              }}
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>{userData.members}</h3>
              <p>Miembros</p>
            </div>
            <div className="stat-item">
              <h3>{userData.status}</h3>
              <p>Estado general</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-pending">{userData.pendingTasks} Pendiente</h3>
              <p>Próxima compra</p>
            </div>
          </div>
        </section>

        {/* Family Section */}
        <section className="family-section">
          <div className="family-header">
            <h2>Tu manada</h2>
          </div>

          {familyMembers.map((member) => (
            <div key={member.id} className="member-card">
              <div className="member-avatar">
                <img 
                  src={member.image} 
                  alt={member.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50x50/7c3aed/white?text=' + member.name.charAt(0);
                  }}
                />
              </div>
              <div className="member-info">
                <div className="member-name">{member.name}</div>
                <div className="member-details">
                  {renderMemberDetails(member)}
                </div>
              </div>
              <div className="member-status">
                <div className="status-item">
                  <span>Próximo:</span>
                </div>
                {member.nextEvents.map((event, index) => (
                  <div 
                    key={index} 
                    className={`status-item ${getStatusClass(event.type)}`}
                  >
                    <span className="status-icon">{event.icon}</span>
                    <span>{event.text}</span>
                  </div>
                ))}
              </div>
              <button 
                className="btn-details" 
                onClick={() => handleViewDetails(member.name)}
              >
                Ver detalles
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default UserProfile;