import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPaymentIntent?: Maybe<Scalars['String']>;
  register?: Maybe<Scalars['String']>;
  updateUser?: Maybe<Scalars['String']>;
};


export type MutationCreatePaymentIntentArgs = {
  enableAutomaticPayments?: InputMaybe<Scalars['Boolean']>;
  promoCode?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  login?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  companyName?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  state: StateEnum;
  zip: Scalars['String'];
};

export enum StateEnum {
  Ak = 'AK',
  Al = 'AL',
  Ar = 'AR',
  As = 'AS',
  Az = 'AZ',
  Ca = 'CA',
  Co = 'CO',
  Ct = 'CT',
  Dc = 'DC',
  De = 'DE',
  Fl = 'FL',
  Fm = 'FM',
  Ga = 'GA',
  Gu = 'GU',
  Hi = 'HI',
  Ia = 'IA',
  Id = 'ID',
  Il = 'IL',
  In = 'IN',
  Ks = 'KS',
  Ky = 'KY',
  La = 'LA',
  Ma = 'MA',
  Md = 'MD',
  Me = 'ME',
  Mh = 'MH',
  Mi = 'MI',
  Mn = 'MN',
  Mo = 'MO',
  Mp = 'MP',
  Ms = 'MS',
  Mt = 'MT',
  Nc = 'NC',
  Nd = 'ND',
  Ne = 'NE',
  Nh = 'NH',
  Nj = 'NJ',
  Nm = 'NM',
  Nv = 'NV',
  Ny = 'NY',
  Oh = 'OH',
  Ok = 'OK',
  Or = 'OR',
  Pa = 'PA',
  Pr = 'PR',
  Pw = 'PW',
  Ri = 'RI',
  Sc = 'SC',
  Sd = 'SD',
  Tn = 'TN',
  Tx = 'TX',
  Ut = 'UT',
  Va = 'VA',
  Vi = 'VI',
  Vt = 'VT',
  Wa = 'WA',
  Wi = 'WI',
  Wv = 'WV',
  Wy = 'WY'
}

export type UpdateUserInput = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  companyName?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  state: StateEnum;
  zip: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  lastName: Scalars['String'];
  paymentStatus?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  StateEnum: StateEnum;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Mutation: {};
  Query: {};
  RegisterInput: RegisterInput;
  String: Scalars['String'];
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPaymentIntent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationCreatePaymentIntentArgs>>;
  register?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'email' | 'password'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  address1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

