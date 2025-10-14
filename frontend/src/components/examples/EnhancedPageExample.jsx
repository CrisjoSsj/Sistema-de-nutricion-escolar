// Ejemplo de cómo usar todos los componentes mejorados juntos
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../common/DashboardLayout.jsx';
import LoadingSpinner, { SkeletonList } from '../common/LoadingSpinner.jsx';
import ErrorState, { EmptyState } from '../common/ErrorState.jsx';
import { useToast, ToastContainer } from '../common/Toast.jsx';
import ConfirmModal, { useConfirmModal } from '../common/ConfirmModal.jsx';
import { useFormValidation, FormField, ValidatedForm } from '../common/FormValidation.jsx';
import SearchBox, { useSearch, AdvancedFilters } from '../common/SearchBox.jsx';
import DataTable from '../common/DataTable.jsx';

export default function ExamplePage() {
  // Estados principales
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Hooks personalizados
  const { success, error: showError, toasts, removeToast } = useToast();
  const { modalState, showConfirm, closeModal } = useConfirmModal();

  // Búsqueda y filtros
  const { searchTerm, setSearchTerm, filteredData, isSearching } = useSearch(
    data, 
    ['name', 'email', 'role']
  );
  
  const [filterValues, setFilterValues] = useState({
    role: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  // Validación de formulario para agregar/editar
  const { values, errors, touched, isValid, handleChange, handleBlur, validateAll } = useFormValidation(
    { name: '', email: '', role: '' },
    {
      name: [
        { required: true, message: 'El nombre es requerido' },
        { minLength: 2, message: 'El nombre debe tener al menos 2 caracteres' }
      ],
      email: [
        { required: true, message: 'El email es requerido' },
        { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Formato de email inválido' }
      ],
      role: [
        { required: true, message: 'Selecciona un rol' }
      ]
    }
  );

  // Datos de ejemplo
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setData([
        { id: 1, name: 'Ana García', email: 'ana@escuela.edu', role: 'Nutricionista', status: 'Activo', createdAt: '2025-01-15' },
        { id: 2, name: 'Carlos Ruiz', email: 'carlos@escuela.edu', role: 'Padre', status: 'Activo', createdAt: '2025-02-10' },
        { id: 3, name: 'María López', email: 'maria@escuela.edu', role: 'Rector', status: 'Inactivo', createdAt: '2025-01-28' },
        { id: 4, name: 'Pedro Sánchez', email: 'pedro@escuela.edu', role: 'Estudiante', status: 'Activo', createdAt: '2025-02-05' }
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  // Configuración de columnas para la tabla
  const columns = [
    {
      key: 'name',
      title: 'Nombre',
      sortable: true,
      render: (value, row) => (
        <div className="user-cell">
          <strong>{value}</strong>
          <div className="user-email">{row.email}</div>
        </div>
      )
    },
    {
      key: 'role',
      title: 'Rol',
      sortable: true,
      render: (value) => (
        <span className={`role-badge role-${value.toLowerCase()}`}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      title: 'Estado',
      sortable: true,
      render: (value) => (
        <span className={`status-badge ${value.toLowerCase()}`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Acciones',
      sortable: false,
      render: (_, row) => (
        <div className="action-buttons">
          <button 
            className="btn btn-sm btn-outline"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
          >
            ✏️ Editar
          </button>
          <button 
            className="btn btn-sm btn-danger"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
          >
            🗑️ Eliminar
          </button>
        </div>
      )
    }
  ];

  // Filtros avanzados
  const advancedFilters = [
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      options: [
        { value: 'nutricionista', label: 'Nutricionista' },
        { value: 'padre', label: 'Padre' },
        { value: 'rector', label: 'Rector' },
        { value: 'estudiante', label: 'Estudiante' }
      ]
    },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      options: [
        { value: 'activo', label: 'Activo' },
        { value: 'inactivo', label: 'Inactivo' }
      ]
    },
    {
      name: 'dateFrom',
      label: 'Fecha desde',
      type: 'date'
    },
    {
      name: 'dateTo',
      label: 'Fecha hasta',
      type: 'date'
    }
  ];

  // Handlers
  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (user) => {
    success(`Editando usuario: ${user.name}`);
  };

  const handleDelete = async (user) => {
    const confirmed = await showConfirm({
      title: 'Eliminar usuario',
      message: `¿Estás seguro de que quieres eliminar a ${user.name}? Esta acción no se puede deshacer.`,
      type: 'danger'
    });

    if (confirmed) {
      success(`Usuario ${user.name} eliminado correctamente`);
    }
  };

  const handleSubmit = async () => {
    if (!validateAll()) return;

    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('Usuario guardado correctamente');
      setShowAddModal(false);
    } catch (error) {
      showError('Error al guardar el usuario');
    }
  };

  const handleRowClick = (row) => {
    success(`Viendo detalles de: ${row.name}`);
  };

  // Aplicar filtros adicionales
  const finalData = filteredData.filter(item => {
    if (filterValues.role && item.role.toLowerCase() !== filterValues.role) return false;
    if (filterValues.status && item.status.toLowerCase() !== filterValues.status) return false;
    return true;
  });

  // Estados de la UI
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="page-header">
          <h1>Usuarios del Sistema</h1>
          <p>Gestiona todos los usuarios registrados</p>
        </div>
        <LoadingSpinner message="Cargando usuarios..." />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <ErrorState
          type="500"
          title="Error al cargar usuarios"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1>Usuarios del Sistema</h1>
        <p>Gestiona todos los usuarios registrados</p>
        <button className="btn btn-primary" onClick={handleAdd}>
          👤 Agregar Usuario
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-section">
        <SearchBox
          placeholder="Buscar por nombre, email o rol..."
          value={searchTerm}
          onChange={setSearchTerm}
          clearable={true}
        />
      </div>

      {/* Filtros avanzados */}
      <AdvancedFilters
        filters={advancedFilters}
        values={filterValues}
        onChange={setFilterValues}
        onReset={() => setFilterValues({ role: '', status: '', dateFrom: '', dateTo: '' })}
      />

      {/* Tabla de datos */}
      {finalData.length === 0 ? (
        <EmptyState
          title="No se encontraron usuarios"
          message="No hay usuarios que coincidan con los criterios de búsqueda."
          actionText="Agregar primer usuario"
          onAction={handleAdd}
        />
      ) : (
        <DataTable
          data={finalData}
          columns={columns}
          loading={isSearching}
          onRowClick={handleRowClick}
          selectable={true}
          onRowSelect={(selectedRows) => console.log('Selected:', selectedRows)}
        />
      )}

      {/* Modal de agregar/editar */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Agregar Usuario</h3>
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <ValidatedForm
                onSubmit={handleSubmit}
                isValid={isValid}
                submitText="Guardar Usuario"
              >
                <FormField
                  label="Nombre completo"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                  touched={touched.name}
                  required={true}
                  placeholder="Ingresa el nombre completo"
                />

                <FormField
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                  required={true}
                  placeholder="usuario@escuela.edu"
                />

                <FormField
                  label="Rol"
                  name="role"
                  type="select"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.role}
                  touched={touched.role}
                  required={true}
                  options={[
                    { value: 'nutricionista', label: 'Nutricionista' },
                    { value: 'padre', label: 'Padre' },
                    { value: 'rector', label: 'Rector' },
                    { value: 'estudiante', label: 'Estudiante' }
                  ]}
                />
              </ValidatedForm>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={modalState.onConfirm}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        isLoading={modalState.isLoading}
      />

      {/* Contenedor de toasts */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </DashboardLayout>
  );
}