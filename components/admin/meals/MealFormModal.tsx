import React from 'react';
import { AdminFormModal } from '../../Modals';
import { ImageUpload } from '../ImageUpload';
import { MenuItem, Chef, Category } from '../../../types';

interface MealFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    currentMeal: MenuItem | null;
    formData: any;
    setFormData: (data: any) => void;
    categories: Category[];
    chefs: Chef[];
}

export const MealFormModal: React.FC<MealFormModalProps> = ({
    isOpen, onClose, onSubmit, currentMeal,
    formData, setFormData, categories, chefs
}) => {
    return (
        <AdminFormModal isOpen={isOpen} onClose={onClose} title={currentMeal ? "تعديل الوجبة" : "إضافة وجبة جديدة"} onSubmit={onSubmit}>
            <div className="space-y-4">
                {/* Image Upload Area */}
                <ImageUpload
                    label="صورة الوجبة"
                    value={formData.img}
                    onChange={(url) => setFormData({ ...formData, img: url })}
                />

                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">اسم الوجبة</label>
                    <input type="text" placeholder="مثال: محشي ورق عنب" className="w-full p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">وصف الوجبة</label>
                    <textarea
                        placeholder="اكتب مكونات الوجبة وتفاصيلها..."
                        className="w-full p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner h-24 resize-none"
                        value={formData.desc}
                        onChange={e => setFormData({ ...formData, desc: e.target.value })}
                        required
                    ></textarea>
                    <p className="text-[9px] text-gray-400 font-bold mr-1">سيظهر هذا الوصف للعملاء في الكارد الأساسي.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">السعر (ج.م)</label>
                        <input type="number" placeholder="150" className="w-full p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">وقت التحضير</label>
                        <input type="text" placeholder="45 دقيقة" className="w-full p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} required />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">القسم</label>
                        <select className="w-full p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} required>
                            <option value="" disabled>اختر القسم</option>
                            {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">الشيف المسئول</label>
                        <select className="w-full p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.chef} onChange={e => setFormData({ ...formData, chef: e.target.value })} required>
                            <option value="" disabled>اختر الشيف</option>
                            {chefs.map(chef => <option key={chef.id} value={chef.name}>{chef.name}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </AdminFormModal>
    );
};
