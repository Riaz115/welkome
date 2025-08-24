import React, { useState } from 'react';
import Card from 'components/card';
import SearchTableUsers from './components/SearchTableUsers';
import { createColumnHelper } from '@tanstack/react-table';
import {
  MdDelete,
  MdEdit,
  MdAdd,
  MdClose,
  MdSave,
  MdSecurity,
  MdCheckCircle,
  MdPeople,
} from 'react-icons/md';
import { IoCheckbox, IoCheckboxOutline } from 'react-icons/io5';
import rolesData, { availablePermissions } from './variables/rolesData';

const columnHelper = createColumnHelper();

const RolesPermissions = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Initialize roles data from imported data
  const [rolesDataState, setRolesDataState] = useState(rolesData);

  // Table columns configuration
  const rolesColumns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ROLE NAME
        </p>
      ),
      cell: (info) => (
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
          <p className="max-w-xs truncate text-xs text-gray-500 dark:text-gray-400">
            {info.row.original.description}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('permissions', {
      id: 'permissions',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PERMISSIONS
        </p>
      ),
      cell: (info) => (
        <div className="flex max-w-xs flex-wrap gap-1">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {info.getValue().length} permissions
          </span>
        </div>
      ),
    }),
    columnHelper.accessor('userCount', {
      id: 'userCount',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">USERS</p>
      ),
      cell: (info) => (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => {
        const status = info.getValue();
        return (
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              status === 'Active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}
          >
            {status}
          </span>
        );
      },
    }),
    columnHelper.accessor('createdDate', {
      id: 'createdDate',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          CREATED
        </p>
      ),
      cell: (info) => (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('id', {
      id: 'actions',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ACTIONS
        </p>
      ),
      cell: (info) => {
        const role = info.row.original;
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEditRole(role)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-blue-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-300"
              title="Edit Role"
            >
              <MdEdit className="h-4 w-4" />
            </button>
            {!role.isSystem && (
              <button
                onClick={() => handleDeleteRole(role.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition-all duration-200 hover:bg-red-50 hover:text-red-800 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                title="Delete Role"
              >
                <MdDelete className="h-4 w-4" />
              </button>
            )}
          </div>
        );
      },
    }),
  ];

  const handleCreateRole = () => {
    setEditingRole(null);
    setRoleName('');
    setRoleDescription('');
    setSelectedPermissions([]);
    setShowCreateModal(true);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setSelectedPermissions(role.permissions);
    setShowCreateModal(true);
  };

  const handleDeleteRole = (roleId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this role? This action cannot be undone.'
      )
    ) {
      setRolesDataState((prev) => prev.filter((role) => role.id !== roleId));
    }
  };

  const handleSaveRole = () => {
    if (!roleName.trim()) {
      alert('Role name is required');
      return;
    }

    if (selectedPermissions.length === 0) {
      alert('Please select at least one permission');
      return;
    }

    const newRole = {
      id: editingRole ? editingRole.id : Date.now(),
      name: roleName.trim(),
      description: roleDescription.trim(),
      permissions: [...selectedPermissions],
      userCount: editingRole ? editingRole.userCount : 0,
      status: 'Active',
      createdDate: editingRole
        ? editingRole.createdDate
        : new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
      isSystem: editingRole ? editingRole.isSystem : false,
    };

    if (editingRole) {
      setRolesDataState((prev) =>
        prev.map((role) => (role.id === editingRole.id ? newRole : role))
      );
    } else {
      setRolesDataState((prev) => [...prev, newRole]);
    }

    setShowCreateModal(false);
  };

  const handlePermissionToggle = (permissionId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const getPermissionName = (permissionId) => {
    for (const category of availablePermissions) {
      const permission = category.permissions.find(
        (p) => p.id === permissionId
      );
      if (permission) return permission.name;
    }
    return permissionId;
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-6">
      {/* Role Creation Zone */}
      <div className="col-span-1">
        <Card extra="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-navy-700 dark:text-white">
                Role Management
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Create and manage user roles with specific permissions
              </p>
            </div>
            <button
              onClick={handleCreateRole}
              className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-white shadow-lg transition-all duration-200 hover:bg-brand-600 hover:shadow-xl dark:bg-brand-400 dark:hover:bg-brand-300"
            >
              <MdAdd className="h-5 w-5" />
              Create New Role
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-4 dark:border-blue-700 dark:from-blue-900/20 dark:to-blue-800/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Total Roles
                  </p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {rolesDataState.length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
                  <MdSecurity className="text-2xl text-white" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-green-100 p-4 dark:border-green-700 dark:from-green-900/20 dark:to-green-800/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    Active Roles
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {
                      rolesDataState.filter((role) => role.status === 'Active')
                        .length
                    }
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500">
                  <MdCheckCircle className="text-2xl text-white" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 p-4 dark:border-purple-700 dark:from-purple-900/20 dark:to-purple-800/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {rolesDataState.reduce(
                      (sum, role) => sum + role.userCount,
                      0
                    )}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500">
                  <MdPeople className="text-2xl text-white" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Roles Listing Table Zone */}
      <div className="col-span-1">
        <SearchTableUsers
          tableData={rolesDataState}
          columns={rolesColumns}
          title="Roles"
          onAddClick={handleCreateRole}
        />
      </div>

      {/* Create/Edit Role Modal */}
      {showCreateModal && (
        <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl dark:bg-navy-800">
            {/* Modal Header */}
            <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-6 dark:border-gray-600">
              <div>
                <h2 className="text-2xl font-bold text-navy-700 dark:text-white">
                  {editingRole ? 'Edit Role' : 'Create New Role'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {editingRole
                    ? 'Modify role settings and permissions'
                    : 'Define a new role with specific permissions'}
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <MdClose className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Role Name *
                    </label>
                    <input
                      type="text"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                      placeholder="Enter role name"
                      className="focus:border-transparent w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-brand-500 dark:border-gray-500 dark:bg-navy-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <input
                      type="text"
                      value={roleDescription}
                      onChange={(e) => setRoleDescription(e.target.value)}
                      placeholder="Brief description of the role"
                      className="focus:border-transparent w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all duration-200 focus:ring-2 focus:ring-brand-500 dark:border-gray-500 dark:bg-navy-600 dark:text-white"
                    />
                  </div>
                </div>

                {/* Permissions Section */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-navy-700 dark:text-white">
                      Permissions *
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedPermissions.length} permission(s) selected
                    </span>
                  </div>

                  <div className="space-y-6">
                    {availablePermissions.map((category) => (
                      <div
                        key={category.category}
                        className="rounded-xl border border-gray-200 p-4 dark:border-gray-600"
                      >
                        <h4 className="text-md mb-3 flex items-center gap-2 font-semibold text-navy-600 dark:text-navy-300">
                          <span className="h-2 w-2 rounded-full bg-brand-500"></span>
                          {category.category}
                        </h4>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {category.permissions.map((permission) => (
                            <div
                              key={permission.id}
                              className="flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                              onClick={() =>
                                handlePermissionToggle(permission.id)
                              }
                            >
                              <div className="mt-0.5">
                                {selectedPermissions.includes(permission.id) ? (
                                  <IoCheckbox className="h-5 w-5 text-brand-500" />
                                ) : (
                                  <IoCheckboxOutline className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-navy-700 dark:text-white">
                                  {permission.name}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                  {permission.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-shrink-0 items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 p-6 dark:border-gray-600 dark:bg-navy-900">
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg border border-gray-300 px-6 py-2 text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRole}
                className="flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-2 text-white shadow-lg transition-all duration-200 hover:bg-brand-600 hover:shadow-xl dark:bg-brand-400 dark:hover:bg-brand-300"
              >
                <MdSave className="h-4 w-4" />
                {editingRole ? 'Update Role' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPermissions;
