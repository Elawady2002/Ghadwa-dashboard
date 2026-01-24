import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { MenuItem } from '../../types';
import { DeleteConfirmModal } from '../Modals';
import { MealTable } from './meals/MealTable';
import { MealFormModal } from './meals/MealFormModal';
import { useMutations } from '../../hooks/useMutations';
import { Loading } from '../../components/Loading';

export const AdminMeals: React.FC = () => {
    // Data Fetching
    const { data: meals = [], isLoading } = useQuery({ queryKey: ['menuItems'], queryFn: api.fetchMenuItems });
    const { data: chefs = [] } = useQuery({ queryKey: ['chefs'], queryFn: api.fetchChefs });
    const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: api.fetchCategories });

    // Mutations
    const mutations = useMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMeal, setCurrentMeal] = useState<MenuItem | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [mealToDelete, setMealToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState<any>({ name: '', price: 0, description: '', image: '', rating: 5, reviews: 0, category: '', chefId: 0 });

    if (isLoading) return <Loading />;

    const openAdd = () => {
        setCurrentMeal(null);
        setFormData({ name: '', price: 0, description: '', image: '', rating: 5, reviews: 0, category: categories[0]?.name || '', chefId: chefs[0]?.id || 0 });
        setIsModalOpen(true);
    };

    const openEdit = (meal: MenuItem) => {
        setCurrentMeal(meal);
        setFormData(meal);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setMealToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (mealToDelete) {
            mutations.deleteMenuItemMutation.mutate(mealToDelete);
            setMealToDelete(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mealData = { ...formData, price: Number(formData.price), chefId: Number(formData.chefId) };
        if (currentMeal) {
            mutations.updateMenuItemMutation.mutate({ ...currentMeal, ...mealData });
        } else {
            const { id, ...dataWithoutId } = mealData;
            mutations.createMenuItemMutation.mutate(dataWithoutId);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-3xl font-black text-gray-900">إدارة الوجبات 🍱</h2>
                    <p className="text-gray-500 text-sm font-bold mt-1">كل الأصناف الموجودة في القائمة</p>
                </div>
                <button onClick={openAdd} className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-[#6b1c1c] transition-all">إضافة وجبة</button>
            </div>

            <MealTable
                meals={meals}
                onEdit={openEdit}
                onDelete={handleDeleteClick}
            />

            <MealFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                currentMeal={currentMeal}
                categories={categories}
                chefs={chefs}
                formData={formData}
                setFormData={setFormData}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="حذف الوجبة"
                message="هل أنت متأكد من حذف هذه الوجبة؟"
            />
        </div>
    );
};
