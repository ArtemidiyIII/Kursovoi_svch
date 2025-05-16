import { $authHost, $host } from "../http/index";

export const createRiver = async (river) =>
{        
    const {data} = await $authHost.post('api/river', river)
        
    return data
}

export const fetchRivers = async () =>
{
    const {data} = await $host.get('api/river')
            
    return data
}

export const createWeekday = async (weekday) =>
{        
    const {data} = await $authHost.post('api/weekday', weekday)
                
    return data
}
        
export const fetchWeekdays = async () =>
{                    
    const {data} = await $host.get('api/weekday')
                    
    return data
}
                
export const createRafting = async (rafting) =>
{        
    const {data} = await $authHost.post('api/raftings', rafting)
                        
    return data
}
                
export const fetchRaftings = async (riverId, weekdayId, page, limitRaftings, price, discount_price) => {
    const response = await $host.get('/api/raftings', {
        params: {
            riverId,
            weekdayId,
            page,
            limitRaftings,
            price,
            discount_price,
        },
    });
    return response.data;
};
                      
export const fetchOneRaftings = async (id) =>
{
    const {data} = await $host.get('api/raftings/'+ id)
                            
    return data
}
export const updateRiver = async (id, riverData) => {
    const { data } = await $authHost.put(`api/river/${id}`, riverData);
    return data;
};
export const updateWeekday = async (id, weekdayData) => {
    const { data } = await $authHost.put(`api/weekday/${id}`, weekdayData);
    return data;
};
                        
export const deleteRiver = async(id)=>{
    try {
        const response = await $authHost.delete(`api/river/${id}`);
        return response.data;
    }
    catch (error) 
    {
        console.error('Error deleting river:', error.response?.data || error.message);
        throw error; 
    }
}
export const deleteWeekday = async(id)=>{
    try {
        const response = await $authHost.delete(`api/weekday/${id}`);
        return response.data;
    }
    catch (error) 
    {
        console.error('Error deleting weekday:', error.response?.data || error.message);
        throw error;
    }
}
export const deleteRafting = async(id)=>{
    try {
        const response = await $host.delete(`api/raftings/${id}`);
        return response.data;
    } catch (error)
    {
        console.error('Error deleting rafting:', error.response?.data || error.message);
        throw error;
    }
}

export const createRating = async (ratingData, userId, raftingId) => {
    console.log(userId, raftingId)
    const { data } = await $authHost.post('api/rating', {
        rate: ratingData.rating,
        userId: userId,
        raftingId: raftingId
    });
    return data;
};
                        
export const fetchAllRatings = async () => {
    const { data } = await $host.get('api/rating');
    return data;
};
                        
export const fetchRatingsByRaftingId = async (raftingId) => {
    const { data } = await $host.get(`api/rating/${raftingId}`);
    return data;
};

export const addToRaftingOrders = async(raftingId, userId)=>{
    const { data } = await $authHost.post('api/ordersrafting/add', { raftingId, userId });
    return data
}

export const getRaftingOrders = async (userId) => {
    try {
        const { data } = await $authHost.get(`api/ordersrafting/${userId}`);
        return data;  
    }
    catch (error)
    {
        throw error; 
    }
};
export const removeFromRaftingOrders = async (ordersId, raftingId) => {
    try {
        const { data } = await $authHost.post('api/ordersrafting/remove', { ordersId, raftingId });
        return data;
    } catch (error)
    {
        console.error("Ошибка при отмене бронирования сплава:", error);
        throw error;
    }
};
export const fetchOrdersRaftingId = async (userId) => {
    try {
        const { data } = await $authHost.get(`api/ordersrafting/ordersrafting/${userId}`);
        return data.ordersId;  
    } catch (error) 
    {
        console.error("Ошибка получения списка заказов бронирования:", error);
        throw error;
    }
};