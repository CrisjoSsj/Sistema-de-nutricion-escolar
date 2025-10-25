import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useSchool } from '../../context/SchoolContext.jsx';
import { useState } from 'react';

export default function RectorSchoolProfile() {
  const { currentSchool } = useSchool();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSection, setEditSection] = useState('');
  const [selectedTab, setSelectedTab] = useState('basic');

  const [schoolData, setSchoolData] = useState({
    basic: {
      name: currentSchool?.name || 'Escuela Umiña',
      logo: currentSchool?.logo || '🏫',
      rbd: '12345-6',
      address: 'Av. Principal 123, Valparaíso',
      phone: '+56 32 234 5678',
      email: 'contacto@umina.edu.cl',
      website: 'www.umina.edu.cl',
      established: '1965',
      principalName: 'Roberto Mendoza Silva',
      principalEmail: 'director@umina.edu.cl',
      description: 'Institución educativa comprometida con la formación integral de nuestros estudiantes, promoviendo valores de excelencia, respeto y responsabilidad social.'
    },
    academic: {
      levels: ['Pre-básica', 'Educación Básica'],
      grades: ['Pre-kinder', 'Kinder', '1° Básico', '2° Básico', '3° Básico', '4° Básico', '5° Básico', '6° Básico', '7° Básico', '8° Básico'],
      totalStudents: 342,
      classrooms: 16,
      averageClassSize: 25,
      teacherStudentRatio: '1:21',
      schoolHours: '08:00 - 15:30',
      nutritionProgram: true,
      specialPrograms: ['Inglés Intensivo', 'Talleres Deportivos', 'Arte y Música']
    },
    facilities: {
      library: true,
      computerLab: true,
      scienceLab: true,
      gymnasium: true,
      cafeteria: true,
      playground: true,
      garden: true,
      infirmary: true,
      specialFacilities: ['Laboratorio de Ciencias', 'Biblioteca Digital', 'Sala de Música', 'Cancha de Fútbol']
    },
    nutrition: {
      kitchenCapacity: 400,
      nutritionistCount: 3,
      mealsPerDay: 350,
      specialDiets: ['Vegetariana', 'Sin gluten', 'Sin lácteos', 'Diabética'],
      allergyProtocols: true,
      localSuppliers: 8,
      organicPercentage: 35
    },
    contact: {
      mainPhone: '+56 32 234 5678',
      emergencyPhone: '+56 32 234 5679',
      fax: '+56 32 234 5680',
      email: 'contacto@umina.edu.cl',
      adminEmail: 'administracion@umina.edu.cl',
      socialMedia: {
        facebook: '@EscuelaUmina',
        instagram: '@escuela_umina_oficial',
        website: 'www.umina.edu.cl'
      }
    }
  });

  const handleEditSection = (section) => {
    setEditSection(section);
    setShowEditModal(true);
  };

  const logoOptions = [
    { emoji: '🏫', label: 'Escuela Clásica' },
    { emoji: '🎓', label: 'Académica' },
    { emoji: '📚', label: 'Educativa' },
    { emoji: '🌟', label: 'Excelencia' },
    { emoji: '🏛️', label: 'Institucional' },
    { emoji: '🌱', label: 'Crecimiento' },
    { emoji: '🎯', label: 'Metas' },
    { emoji: '💡', label: 'Innovación' }
  ];

  const tabs = [
    { id: 'basic', label: 'Información Básica', icon: '🏫' },
    { id: 'academic', label: 'Académico', icon: '📚' },
    { id: 'facilities', label: 'Instalaciones', icon: '🏢' },
    { id: 'nutrition', label: 'Nutrición', icon: '🍽️' },
    { id: 'contact', label: 'Contacto', icon: '📞' }
  ];

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="page-header">
        <h1 className="page-title">
          🏫 Perfil de la Escuela
        </h1>
        <p className="page-description">
          Gestiona toda la información y configuración de tu institución educativa
        </p>
      </div>

      {/* Navegación por tabs */}
      <div className="tabs-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${selectedTab === tab.id ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Información Básica */}
      {selectedTab === 'basic' && (
        <div className="tab-content">
          <div className="section-header">
            <h3>🏫 Información básica de la institución</h3>
            <button 
              className="edit-section-btn"
              onClick={() => handleEditSection('basic')}
            >
              ✏️ Editar
            </button>
          </div>

          <div className="school-profile-card">
            <div className="school-header">
              <div className="school-logo-section">
                <div className="school-logo-display">
                  <span className="logo-emoji">{schoolData.basic.logo}</span>
                </div>
                <div className="school-identity">
                  <h2 className="school-name">{schoolData.basic.name}</h2>
                  <p className="school-rbd">RBD: {schoolData.basic.rbd}</p>
                  <p className="school-established">Fundada en {schoolData.basic.established}</p>
                </div>
              </div>
            </div>

            <div className="school-description">
              <h4>Descripción institucional</h4>
              <p>{schoolData.basic.description}</p>
            </div>

            <div className="school-details-grid">
              <div className="detail-group">
                <h4>📍 Ubicación</h4>
                <div className="detail-item">
                  <span className="detail-label">Dirección:</span>
                  <span className="detail-value">{schoolData.basic.address}</span>
                </div>
              </div>

              <div className="detail-group">
                <h4>📞 Contacto principal</h4>
                <div className="detail-item">
                  <span className="detail-label">Teléfono:</span>
                  <span className="detail-value">{schoolData.basic.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{schoolData.basic.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Sitio web:</span>
                  <span className="detail-value">{schoolData.basic.website}</span>
                </div>
              </div>

              <div className="detail-group">
                <h4>👨‍💼 Dirección</h4>
                <div className="detail-item">
                  <span className="detail-label">Director:</span>
                  <span className="detail-value">{schoolData.basic.principalName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email director:</span>
                  <span className="detail-value">{schoolData.basic.principalEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Información Académica */}
      {selectedTab === 'academic' && (
        <div className="tab-content">
          <div className="section-header">
            <h3>📚 Información académica</h3>
            <button 
              className="edit-section-btn"
              onClick={() => handleEditSection('academic')}
            >
              ✏️ Editar
            </button>
          </div>

          <div className="academic-info">
            <div className="academic-stats">
              <div className="stat-card">
                <div className="stat-icon">👨‍🎓</div>
                <div className="stat-content">
                  <h4>{schoolData.academic.totalStudents}</h4>
                  <p>Estudiantes totales</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏫</div>
                <div className="stat-content">
                  <h4>{schoolData.academic.classrooms}</h4>
                  <p>Salas de clase</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h4>{schoolData.academic.averageClassSize}</h4>
                  <p>Promedio por clase</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👨‍🏫</div>
                <div className="stat-content">
                  <h4>{schoolData.academic.teacherStudentRatio}</h4>
                  <p>Ratio profesor/estudiante</p>
                </div>
              </div>
            </div>

            <div className="academic-details">
              <div className="detail-section">
                <h4>🎓 Niveles educativos</h4>
                <div className="level-tags">
                  {schoolData.academic.levels.map((level, index) => (
                    <span key={index} className="level-tag">{level}</span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h4>📖 Grados disponibles</h4>
                <div className="grades-grid">
                  {schoolData.academic.grades.map((grade, index) => (
                    <div key={index} className="grade-item">
                      <span className="grade-name">{grade}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h4>⏰ Horarios</h4>
                <div className="schedule-info">
                  <div className="schedule-item">
                    <span className="schedule-label">Horario escolar:</span>
                    <span className="schedule-value">{schoolData.academic.schoolHours}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>🌟 Programas especiales</h4>
                <div className="programs-list">
                  {schoolData.academic.specialPrograms.map((program, index) => (
                    <div key={index} className="program-item">
                      <span className="program-icon">⭐</span>
                      <span className="program-name">{program}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instalaciones */}
      {selectedTab === 'facilities' && (
        <div className="tab-content">
          <div className="section-header">
            <h3>🏢 Instalaciones y recursos</h3>
            <button 
              className="edit-section-btn"
              onClick={() => handleEditSection('facilities')}
            >
              ✏️ Editar
            </button>
          </div>

          <div className="facilities-info">
            <div className="facilities-grid">
              <div className="facility-category">
                <h4>📚 Académicas</h4>
                <div className="facility-items">
                  <div className={`facility-item ${schoolData.facilities.library ? 'available' : 'unavailable'}`}>
                    <span className="facility-icon">📚</span>
                    <span className="facility-name">Biblioteca</span>
                    <span className="facility-status">{schoolData.facilities.library ? '✅' : '❌'}</span>
                  </div>
                  <div className={`facility-item ${schoolData.facilities.computerLab ? 'available' : 'unavailable'}`}>
                    <span className="facility-icon">💻</span>
                    <span className="facility-name">Laboratorio de Computación</span>
                    <span className="facility-status">{schoolData.facilities.computerLab ? '✅' : '❌'}</span>
                  </div>
                  <div className={`facility-item ${schoolData.facilities.scienceLab ? 'available' : 'unavailable'}`}>
                    <span className="facility-icon">🔬</span>
                    <span className="facility-name">Laboratorio de Ciencias</span>
                    <span className="facility-status">{schoolData.facilities.scienceLab ? '✅' : '❌'}</span>
                  </div>
                </div>
              </div>

              <div className="facility-category">
                <h4>🏃‍♂️ Deportivas y recreativas</h4>
                <div className="facility-items">
                  <div className={`facility-item ${schoolData.facilities.gymnasium ? 'available' : 'unavailable'}`}>
                    <span className="facility-icon">🏃‍♂️</span>
                    <span className="facility-name">Gimnasio</span>
                    <span className="facility-status">{schoolData.facilities.gymnasium ? '✅' : '❌'}</span>
                  </div>
                  <div className={`facility-item ${schoolData.facilities.playground ? 'available' : 'unavailable'}`}>
                    <span className="facility-icon">🎮</span>
                    <span className="facility-name">Patio de Recreo</span>
                    <span className="facility-status">{schoolData.facilities.playground ? '✅' : '❌'}</span>
                  </div>
                  <div className={`facility-item ${schoolData.facilities.garden ? 'available' : 'unavailable'}`}>
                    <span className="facility-icon">🌱</span>
                    <span className="facility-name">Jardín/Huerto</span>
                    <span className="facility-status">{schoolData.facilities.garden ? '✅' : '❌'}</span>
                  </div>
                </div>
              </div>

              <div className="facility-category">
                <h4>🍽️ Alimentación y salud</h4>
                <div className="facility-items">
                  <div className={`facility-item ${schoolData.facilities.cafeteria ? 'available' : 'unavailable'}`}>
                    <span className="facility-icon">🍽️</span>
                    <span className="facility-name">Cafetería/Comedor</span>
                    <span className="facility-status">{schoolData.facilities.cafeteria ? '✅' : '❌'}</span>
                  </div>
                  <div className={`facility-item ${schoolData.facilities.infirmary ? 'available' : 'unavailable'}`}>
                    <span className="facility-icon">🏥</span>
                    <span className="facility-name">Enfermería</span>
                    <span className="facility-status">{schoolData.facilities.infirmary ? '✅' : '❌'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="special-facilities">
              <h4>⭐ Instalaciones especiales</h4>
              <div className="special-facilities-list">
                {schoolData.facilities.specialFacilities.map((facility, index) => (
                  <div key={index} className="special-facility-item">
                    <span className="special-facility-icon">🏢</span>
                    <span className="special-facility-name">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nutrición */}
      {selectedTab === 'nutrition' && (
        <div className="tab-content">
          <div className="section-header">
            <h3>🍽️ Programa de nutrición escolar</h3>
            <button 
              className="edit-section-btn"
              onClick={() => handleEditSection('nutrition')}
            >
              ✏️ Editar
            </button>
          </div>

          <div className="nutrition-info">
            <div className="nutrition-stats">
              <div className="stat-card">
                <div className="stat-icon">🍽️</div>
                <div className="stat-content">
                  <h4>{schoolData.nutrition.kitchenCapacity}</h4>
                  <p>Capacidad cocina</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👩‍⚕️</div>
                <div className="stat-content">
                  <h4>{schoolData.nutrition.nutritionistCount}</h4>
                  <p>Nutricionistas</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h4>{schoolData.nutrition.mealsPerDay}</h4>
                  <p>Comidas por día</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌱</div>
                <div className="stat-content">
                  <h4>{schoolData.nutrition.organicPercentage}%</h4>
                  <p>Ingredientes orgánicos</p>
                </div>
              </div>
            </div>

            <div className="nutrition-details">
              <div className="detail-section">
                <h4>🥗 Dietas especiales disponibles</h4>
                <div className="diet-tags">
                  {schoolData.nutrition.specialDiets.map((diet, index) => (
                    <span key={index} className="diet-tag">{diet}</span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h4>🛡️ Protocolos de seguridad</h4>
                <div className="safety-protocols">
                  <div className={`protocol-item ${schoolData.nutrition.allergyProtocols ? 'active' : 'inactive'}`}>
                    <span className="protocol-icon">⚠️</span>
                    <span className="protocol-name">Protocolos de alergias</span>
                    <span className="protocol-status">{schoolData.nutrition.allergyProtocols ? 'Activo' : 'Inactivo'}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>🚚 Proveedores locales</h4>
                <div className="supplier-info">
                  <div className="supplier-stat">
                    <span className="supplier-icon">🏪</span>
                    <div className="supplier-data">
                      <span className="supplier-count">{schoolData.nutrition.localSuppliers}</span>
                      <span className="supplier-label">Proveedores activos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contacto */}
      {selectedTab === 'contact' && (
        <div className="tab-content">
          <div className="section-header">
            <h3>📞 Información de contacto</h3>
            <button 
              className="edit-section-btn"
              onClick={() => handleEditSection('contact')}
            >
              ✏️ Editar
            </button>
          </div>

          <div className="contact-info">
            <div className="contact-sections">
              <div className="contact-section">
                <h4>📞 Teléfonos</h4>
                <div className="contact-items">
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <div className="contact-data">
                      <span className="contact-label">Principal:</span>
                      <span className="contact-value">{schoolData.contact.mainPhone}</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">🚨</span>
                    <div className="contact-data">
                      <span className="contact-label">Emergencias:</span>
                      <span className="contact-value">{schoolData.contact.emergencyPhone}</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📠</span>
                    <div className="contact-data">
                      <span className="contact-label">Fax:</span>
                      <span className="contact-value">{schoolData.contact.fax}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-section">
                <h4>📧 Correos electrónicos</h4>
                <div className="contact-items">
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <div className="contact-data">
                      <span className="contact-label">General:</span>
                      <span className="contact-value">{schoolData.contact.email}</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">💼</span>
                    <div className="contact-data">
                      <span className="contact-label">Administración:</span>
                      <span className="contact-value">{schoolData.contact.adminEmail}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-section">
                <h4>🌐 Redes sociales</h4>
                <div className="contact-items">
                  <div className="contact-item">
                    <span className="contact-icon">📘</span>
                    <div className="contact-data">
                      <span className="contact-label">Facebook:</span>
                      <span className="contact-value">{schoolData.contact.socialMedia.facebook}</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📷</span>
                    <div className="contact-data">
                      <span className="contact-label">Instagram:</span>
                      <span className="contact-value">{schoolData.contact.socialMedia.instagram}</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">🌐</span>
                    <div className="contact-data">
                      <span className="contact-label">Sitio web:</span>
                      <span className="contact-value">{schoolData.contact.socialMedia.website}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal modal-large">
            <div className="modal-header">
              <h3 className="modal-title">
                Editar {
                  editSection === 'basic' && 'Información Básica' ||
                  editSection === 'academic' && 'Información Académica' ||
                  editSection === 'facilities' && 'Instalaciones' ||
                  editSection === 'nutrition' && 'Programa de Nutrición' ||
                  editSection === 'contact' && 'Información de Contacto'
                }
              </h3>
              <button 
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              {editSection === 'basic' && (
                <div className="edit-basic">
                  <div className="form-section">
                    <h4>Identidad de la escuela</h4>
                    <div className="logo-selection">
                      <label>Logo de la escuela:</label>
                      <div className="logo-options">
                        {logoOptions.map((option, index) => (
                          <div 
                            key={index}
                            className={`logo-option ${schoolData.basic.logo === option.emoji ? 'selected' : ''}`}
                            onClick={() => {
                              setSchoolData(prev => ({
                                ...prev,
                                basic: { ...prev.basic, logo: option.emoji }
                              }));
                            }}
                          >
                            <span className="option-emoji">{option.emoji}</span>
                            <span className="option-label">{option.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Nombre de la escuela:</label>
                      <input 
                        type="text" 
                        defaultValue={schoolData.basic.name}
                        placeholder="Nombre completo de la institución"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>RBD:</label>
                      <input 
                        type="text" 
                        defaultValue={schoolData.basic.rbd}
                        placeholder="Rol Base de Datos"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Año de fundación:</label>
                      <input 
                        type="number" 
                        defaultValue={schoolData.basic.established}
                        placeholder="1965"
                      />
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>Descripción institucional</h4>
                    <div className="form-group">
                      <label>Descripción:</label>
                      <textarea 
                        rows="4"
                        defaultValue={schoolData.basic.description}
                        placeholder="Describe la misión y visión de tu escuela..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>Dirección</h4>
                    <div className="form-group">
                      <label>Nombre del director:</label>
                      <input 
                        type="text" 
                        defaultValue={schoolData.basic.principalName}
                        placeholder="Nombre completo del director"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email del director:</label>
                      <input 
                        type="email" 
                        defaultValue={schoolData.basic.principalEmail}
                        placeholder="director@escuela.edu.cl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {editSection === 'contact' && (
                <div className="edit-contact">
                  <div className="form-section">
                    <h4>Información de contacto</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Teléfono principal:</label>
                        <input 
                          type="tel" 
                          defaultValue={schoolData.contact.mainPhone}
                          placeholder="+56 32 234 5678"
                        />
                      </div>
                      <div className="form-group">
                        <label>Teléfono emergencias:</label>
                        <input 
                          type="tel" 
                          defaultValue={schoolData.contact.emergencyPhone}
                          placeholder="+56 32 234 5679"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Email general:</label>
                        <input 
                          type="email" 
                          defaultValue={schoolData.contact.email}
                          placeholder="contacto@escuela.edu.cl"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email administración:</label>
                        <input 
                          type="email" 
                          defaultValue={schoolData.contact.adminEmail}
                          placeholder="admin@escuela.edu.cl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>Redes sociales</h4>
                    <div className="form-group">
                      <label>Facebook:</label>
                      <input 
                        type="text" 
                        defaultValue={schoolData.contact.socialMedia.facebook}
                        placeholder="@EscuelaOficial"
                      />
                    </div>
                    <div className="form-group">
                      <label>Instagram:</label>
                      <input 
                        type="text" 
                        defaultValue={schoolData.contact.socialMedia.instagram}
                        placeholder="@escuela_oficial"
                      />
                    </div>
                    <div className="form-group">
                      <label>Sitio web:</label>
                      <input 
                        type="url" 
                        defaultValue={schoolData.contact.socialMedia.website}
                        placeholder="www.escuela.edu.cl"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}